import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { DrawingProvider, useDrawing } from "../features/draw/drawing-context";
import { PrimaryToolbar } from "../features/draw/primary-toolbar";
import { ToolOptions } from "../features/draw/tool-options";
import { toolsInitialState, toolTypes } from "../features/draw/tools";

export const Route = createFileRoute("/")({
	component: App,
});

const INITIAL_WIDTH = 2000;
const INITIAL_HEIGHT = 2000;

/**
 * The main Canvas component handles user input (mouse/touch), interacts with the DrawingContext,
 * and renders the actual <canvas> element.
 */
function Canvas() {
	// canvasRef - Ref to access the underlying <canvas> HTML element directly.
	// Needed for getting the drawing context and potentially other canvas properties.
	const canvasRef = useRef<HTMLCanvasElement>(null);
	// containerRef - Ref to access the container div that holds the canvas.
	// Used here to calculate the correct mouse/touch position relative to the canvas, especially when the container might be scrolled or positioned differently.
	const containerRef = useRef<HTMLDivElement>(null);
	// ctxRef - Ref to store the 2D rendering context of the canvas.
	// This context object is used for all drawing operations (lines, shapes, colors, etc.).
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
	// Ref to keep track of the last pointer position during drawing.
	const lastPosRef = useRef({ x: 0, y: 0 });
	// Ref to ensure initialization logic runs only once, even in React StrictMode.
	const didMountRef = useRef(false);

	const {
		activeTool,
		currentImageData,
		pushToHistory,
		editToolProperties,
		getTool,
		undo,
		redo,
	} = useDrawing();

	// Effect runs once on mount to set up the canvas dimensions and context.
	useEffect(() => {
		const canvas = canvasRef.current;
		const canvasContext = canvas?.getContext("2d", {
			willReadFrequently: true,
		});

		if (!canvas || !canvasContext) {
			return;
		}

		// Set the actual size of the canvas element.
		canvas.width = INITIAL_WIDTH;
		canvas.height = INITIAL_HEIGHT;
		ctxRef.current = canvasContext;

		// This guard ensures setupCanvas runs only once, preventing issues in Strict Mode
		// where effects can run twice during development.
		if (!didMountRef.current) {
			setupCanvas();
			didMountRef.current = true;
		}
	}, []);

	// const drawGrid = useCallback((ctx: CanvasRenderingContext2D) => {
	// 	ctx.save();
	// 	ctx.strokeStyle = "#E0DCD3";
	// 	ctx.lineWidth = 1;

	// 	// Draw vertical lines
	// 	for (let x = 0; x <= INITIAL_WIDTH; x += 50) {
	// 		ctx.beginPath();
	// 		ctx.moveTo(x, 0);
	// 		ctx.lineTo(x, INITIAL_HEIGHT);
	// 		ctx.stroke();
	// 	}

	// 	// Draw horizontal lines
	// 	for (let y = 0; y <= INITIAL_HEIGHT; y += 50) {
	// 		ctx.beginPath();
	// 		ctx.moveTo(0, y);
	// 		ctx.lineTo(INITIAL_WIDTH, y);
	// 		ctx.stroke();
	// 	}

	// 	ctx.restore();
	// }, []);

	// Sets up the initial canvas state (styling, grid) and saves the first history snapshot.
	const setupCanvas = useCallback(() => {
		const ctx = ctxRef.current;
		if (!ctx || !canvasRef.current) {
			return;
		}

		// Set default line styles for drawing.
		ctx.lineCap = "round";
		ctx.lineJoin = "round";

		// Capture the initial blank state (just the grid) as the first history entry.
		const initialState = ctx.getImageData(
			0,
			0,
			canvasRef.current.width,
			canvasRef.current.height,
		);
		// Push this initial state into the history.
		pushToHistory(initialState);
	}, [pushToHistory]);

	// It keeps the visual canvas synchronized with the application state managed by the DrawingProvider.
	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = ctxRef.current;
		if (!canvas || !ctx) {
			return;
		}

		// Clear the canvas completely before redrawing.
		ctx.clearRect(0, 0, INITIAL_WIDTH, INITIAL_HEIGHT);

		// If there's a drawing state from history, paint it onto the canvas.
		if (currentImageData) {
			ctx.putImageData(currentImageData, 0, 0);
		}
	}, [currentImageData]);

	// Calculates the pointer's X, Y coordinates relative to the canvas,
	// accounting for the container's scroll position and offset.
	const getPosition = (e: React.MouseEvent | React.TouchEvent) => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) {
			return { x: 0, y: 0 };
		}

		const rect = container.getBoundingClientRect(); // Position of the container on the screen
		let clientX: number;
		let clientY: number;

		// Handle both mouse and touch events to get screen coordinates.
		if ("touches" in e) {
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
		} else {
			clientX = e.clientX;
			clientY = e.clientY;
		}

		// Calculate position relative to the container, then add scroll offset.
		const x = clientX - rect.left + container.scrollLeft;
		const y = clientY - rect.top + container.scrollTop;

		return { x, y };
	};

	const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
		if (!ctxRef.current) {
			return;
		}

		switch (activeTool) {
			case toolTypes.pencil:
				editToolProperties(toolTypes.pencil, { active: true });
				break;
			case toolTypes.eraser:
				editToolProperties(toolTypes.eraser, { active: true });
				break;
			default:
				break;
		}

		// Starts a new, independent drawing path, essential for correct rendering and history snapshots.
		ctxRef.current.beginPath();
		lastPosRef.current = getPosition(e);
	};

	const draw = (e: React.MouseEvent | React.TouchEvent) => {
		const ctx = ctxRef.current;
		if (!ctx) {
			return;
		}

		const pos = getPosition(e);

		switch (activeTool) {
			case toolTypes.pencil: {
				const tool = getTool(activeTool);
				if (!tool.active) {
					return;
				}

				ctx.beginPath();
				ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
				ctx.lineTo(pos.x, pos.y);
				ctx.lineWidth = tool.strokeWidth;
				ctx.strokeStyle = tool.color;
				ctx.stroke();
				lastPosRef.current = pos;
				break;
			}
			case toolTypes.eraser: {
				// TODO: Implement eraser
				break;
			}
			default: {
				break;
			}
		}

		// Keep it after the switch to avoid any potential issues.
		lastPosRef.current = pos;
	};

	const stopDrawing = () => {
		switch (activeTool) {
			case toolTypes.pencil:
				editToolProperties(toolTypes.pencil, { active: false });
				break;
			case toolTypes.eraser:
				// editToolProperties(toolTypes.eraser, { active: false });
				break;
			default:
				break;
		}

		const canvas = canvasRef.current;
		const ctx = ctxRef.current;
		if (canvas && ctx) {
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			pushToHistory(imageData);
		}
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "z") {
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
	}, [undo, redo]);

	// Render the scrollable container and the canvas element within it.
	// Attach all the necessary event handlers for mouse and touch input.
	return (
		<div ref={containerRef} className="flex flex-1 bg-[#F0EDE5] overflow-auto">
			<canvas
				ref={canvasRef}
				className="flex flex-1"
				onMouseDown={startDrawing}
				onMouseMove={draw}
				onMouseUp={stopDrawing}
				onMouseOut={stopDrawing}
				onBlur={stopDrawing}
				onTouchStart={startDrawing}
				onTouchMove={draw}
				onTouchEnd={stopDrawing}
				style={{ touchAction: "none" }}
			/>
		</div>
	);
}

function App() {
	const [tools] = useState(toolsInitialState);

	return (
		<DrawingProvider tools={tools}>
			<div className="w-dvw h-dvh flex flex-col bg-white overflow-hidden relative">
				<div className="absolute top-0 left-0 right-0 z-10">
					<PrimaryToolbar />
				</div>
				<div className="absolute top-[59px] left-0 bottom-0 z-10">
					<ToolOptions />
				</div>
				<div className="absolute inset-0">
					<Canvas />
				</div>
			</div>
		</DrawingProvider>
	);
}
