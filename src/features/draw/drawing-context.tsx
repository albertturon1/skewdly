import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

interface DrawingContextType {
	color: string;
	setColor: (color: string) => void;
	strokeWidth: number;
	setStrokeWidth: (width: number) => void;
	isDrawing: boolean;
	setIsDrawing: (isDrawing: boolean) => void;
}

const DrawingContext = createContext<DrawingContextType | null>(null);

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
	const [isDrawing, setIsDrawing] = useState(false);

	const handleSetColor = useCallback((color: string) => {
		setColor(color);
		localStorage.setItem("drawingColor", color);
	}, []);

	const handleSetStrokeWidth = useCallback((width: number) => {
		setStrokeWidth(width);
		localStorage.setItem("strokeWidth", width.toString());
	}, []);

	const value = {
		color,
		setColor: handleSetColor,
		strokeWidth,
		setStrokeWidth: handleSetStrokeWidth,
		isDrawing,
		setIsDrawing,
	};

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
