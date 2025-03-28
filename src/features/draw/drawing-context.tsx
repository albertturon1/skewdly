import {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
	useMemo,
	useReducer,
} from "react";
import type { ReactNode } from "react";
import { tools, type Tool } from "./tools";

interface HistoryState {
	stack: ImageData[];
	index: number;
}

const INITIAL_HISTORY_STATE: HistoryState = { stack: [], index: -1 };

type HistoryAction =
	| { type: "PUSH"; payload: ImageData }
	| { type: "UNDO" }
	| { type: "REDO" }
	| { type: "CLEAR" };

function historyReducer(
	state: HistoryState,
	action: HistoryAction,
): HistoryState {
	switch (action.type) {
		case "PUSH": {
			const { stack, index } = state;
			const newStack = stack.slice(0, index + 1);
			newStack.push(action.payload);
			return { stack: newStack, index: newStack.length - 1 };
		}
		case "UNDO": {
			if (state.index <= 0) {
				return state; // Cannot undo
			}
			return { ...state, index: state.index - 1 };
		}
		case "REDO": {
			if (state.index >= state.stack.length - 1) {
				return state; // Cannot redo
			}
			return { ...state, index: state.index + 1 };
		}
		case "CLEAR": {
			const { stack } = state;
			return { stack: stack.slice(0, 1), index: 0 };
		}
		default: {
			throw new Error(`Unhandled action type: ${action}`);
		}
	}
}

interface DrawingContextProps {
	color: string;
	setColor: (color: string) => void;
	strokeWidth: number;
	setStrokeWidth: (width: number) => void;
	tool: Tool;
	setTool: (tool: Tool) => void;
	isDrawing: boolean;
	setIsDrawing: (isDrawing: boolean) => void;
	currentImageData: ImageData | null;
	pushToHistory: (imageData: ImageData) => void;
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
	clearCanvas: () => void;
}

const DrawingContext = createContext<DrawingContextProps | null>(null);

const DEFAULT_COLOR = "#000000";
const DEFAULT_STROKE_WIDTH = 2;

export function DrawingProvider({ children }: { children: ReactNode }) {
	const [color, setColor] = useState(() => {
		const savedColor = localStorage.getItem("drawingColor");
		return savedColor || DEFAULT_COLOR;
	});
	const [strokeWidth, setStrokeWidth] = useState(() => {
		const savedWidth = localStorage.getItem("strokeWidth");
		const strWidth = Number(savedWidth);
		return strWidth && !Number.isNaN(strWidth)
			? strWidth
			: DEFAULT_STROKE_WIDTH;
	});
	const [tool, setTool] = useState<Tool>(tools.pencil);
	const [isDrawing, setIsDrawing] = useState(false);

	const [historyState, dispatchHistory] = useReducer(
		historyReducer,
		INITIAL_HISTORY_STATE,
	);

	const { stack: history, index: currentHistoryIndex } = historyState;

	const currentImageData = useMemo(() => {
		return currentHistoryIndex >= 0 ? history[currentHistoryIndex] : null;
	}, [history, currentHistoryIndex]);

	const canUndo = currentHistoryIndex > 0;
	const canRedo = currentHistoryIndex < history.length - 1;

	const pushToHistory = useCallback((imageData: ImageData) => {
		dispatchHistory({ type: "PUSH", payload: imageData });
	}, []);

	const undo = useCallback(() => {
		dispatchHistory({ type: "UNDO" });
	}, []);

	const redo = useCallback(() => {
		dispatchHistory({ type: "REDO" });
	}, []);

	const clearCanvas = useCallback(() => {
		dispatchHistory({ type: "CLEAR" });
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "z" && !isDrawing) {
				e.preventDefault();
				if (e.shiftKey) {
					redo();
				} else {
					undo();
				}
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [undo, redo, isDrawing]);

	const handleSetColor = useCallback((color: string) => {
		setColor(color);
		localStorage.setItem("drawingColor", color);
	}, []);
	const handleSetStrokeWidth = useCallback((width: number) => {
		setStrokeWidth(width);
		localStorage.setItem("strokeWidth", width.toString());
	}, []);

	const value = useMemo(
		() => ({
			color,
			setColor: handleSetColor,
			strokeWidth,
			setStrokeWidth: handleSetStrokeWidth,
			tool,
			setTool,
			isDrawing,
			setIsDrawing,
			currentImageData,
			canUndo,
			canRedo,
			pushToHistory,
			undo,
			redo,
			clearCanvas,
		}),
		[
			color,
			handleSetColor,
			strokeWidth,
			handleSetStrokeWidth,
			tool,
			isDrawing,
			currentImageData,
			canUndo,
			canRedo,
			pushToHistory,
			undo,
			redo,
			clearCanvas,
		],
	);

	return (
		<DrawingContext.Provider value={value}>{children}</DrawingContext.Provider>
	);
}

export function useDrawing() {
	const context = useContext(DrawingContext);
	if (!context) {
		throw new Error("useDrawing must be used within a DrawingProvider");
	}
	return context;
}
