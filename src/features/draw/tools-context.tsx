import {
	createContext,
	useContext,
	useState,
	useCallback,
	useMemo,
	useReducer,
} from "react";
import type { ReactNode } from "react";
import type { toolsInitialState, Tool } from "@/features/draw/tools";
import { INITIAL_HISTORY_STATE, historyReducer } from "@/features/draw/history";
import type { PartialDeep } from "type-fest";

export type GenericTools = { activeTool: string; tools: Record<string, Tool> };

interface ToolContextProps<Tools extends GenericTools> {
	editToolProperties: <Name extends keyof Tools["tools"]>(
		name: Name,
		toolProperties: PartialDeep<Tools["tools"][Name]["properties"]>,
	) => void;
	activeTool: Tools["activeTool"];
	getTool: <Name extends keyof Tools["tools"]>(
		name: Name,
	) => Tools["tools"][Name]["properties"];
	setActiveTool: <Name extends keyof Tools["tools"]>(tool: Name) => void;
	currentImageData: ImageData | null;
	currentHistoryIndex: number;
	pushToHistory: (imageData: ImageData) => void;
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
	clearCanvas: () => void;
}

// biome-ignore lint/suspicious/noExplicitAny: generic type for context
const ToolContext = createContext<ToolContextProps<any> | null>(null);

export function ToolsProvider<const Tools extends GenericTools>({
	children,
	tools: initialTools,
}: { children: ReactNode; tools: Tools }) {
	const [tools, setTools] = useState<Tools>(() => {
		const storedTools = localStorage.getItem("tools");
		if (!storedTools) {
			return initialTools;
		}

		// TODO: Check if the stored tools are compatible with the initial tools
		return deepMerge(initialTools, JSON.parse(storedTools)) as Tools;
	});

	const setActiveTool: ToolContextProps<Tools>["setActiveTool"] = useCallback(
		(tool) => {
			setTools((prev) => ({ ...prev, activeTool: tool }));
		},
		[],
	);

	const getTool: ToolContextProps<Tools>["getTool"] = useCallback(
		(name) => {
			return tools.tools[name as keyof typeof tools.tools].properties;
		},
		[tools.tools],
	);

	const editToolProperties: ToolContextProps<Tools>["editToolProperties"] =
		useCallback((name, toolProperties) => {
			setTools((prev) => {
				const currentToolProperties =
					prev.tools[name as keyof typeof prev.tools].properties;
				const newToolProperties = Object.assign(
					{},
					currentToolProperties,
					toolProperties,
				);

				const final = {
					...prev,
					tools: {
						...prev.tools,
						[name]: {
							...prev.tools[name as keyof typeof prev.tools],
							properties: newToolProperties,
						},
					},
				};

				localStorage.setItem("tools", JSON.stringify(final));
				return final;
			});
		}, []);

	const activeTool = useMemo(() => {
		return tools.activeTool;
	}, [tools.activeTool]);

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

	const value: ToolContextProps<Tools> = useMemo(
		() => ({
			setActiveTool,
			editToolProperties,
			activeTool,
			getTool,
			currentImageData,
			canUndo,
			canRedo,
			pushToHistory,
			undo,
			redo,
			clearCanvas,
			currentHistoryIndex,
		}),
		[
			currentImageData,
			canUndo,
			canRedo,
			activeTool,
			editToolProperties,
			pushToHistory,
			setActiveTool,
			undo,
			redo,
			clearCanvas,
			getTool,
			currentHistoryIndex,
		],
	);

	return <ToolContext.Provider value={value}>{children}</ToolContext.Provider>;
}

export function useTools() {
	const context = useContext(ToolContext) as ToolContextProps<
		typeof toolsInitialState
	>;
	if (!context) {
		throw new Error("useTools must be used within a ToolsProvider");
	}
	return context;
}

function deepMerge(
	target: Record<string, unknown>,
	source: Record<string, unknown>,
): Record<string, unknown> {
	if (
		typeof target !== "object" ||
		target === null ||
		typeof source !== "object" ||
		source === null
	) {
		return source;
	}

	const result: Record<string, unknown> = { ...target };

	for (const key of Object.keys(source)) {
		if (
			typeof source[key] === "object" &&
			source[key] !== null &&
			typeof target[key] === "object" &&
			target[key] !== null
		) {
			result[key] = deepMerge(
				target[key] as Record<string, unknown>,
				source[key] as Record<string, unknown>,
			);
		} else {
			result[key] = source[key];
		}
	}

	return result;
}
