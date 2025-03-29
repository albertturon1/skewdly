import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef } from "react";
import { DrawingProvider, useDrawing } from "../features/draw/drawing-context";
import { PrimaryToolbar } from "../features/draw/primary-toolbar";
import { ToolOptionsToolbar } from "../features/draw/tool-options-toolbar";
import { tools } from "../features/draw/tools";

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
		tool,
		isDrawing,
		setIsDrawing,
		color,
		strokeWidth,
		currentImageData,
		pushToHistory,
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

	const drawGrid = useCallback((ctx: CanvasRenderingContext2D) => {
		ctx.save(); // Save current context state (like strokeStyle)
		ctx.strokeStyle = "#ddd"; // Light grey color for the grid
		ctx.lineWidth = 1;

		// Draw vertical lines
		for (let x = 0; x <= INITIAL_WIDTH; x += 50) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, INITIAL_HEIGHT); // Use constant for height
			ctx.stroke();
		}

		// Draw horizontal lines
		for (let y = 0; y <= INITIAL_HEIGHT; y += 50) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(INITIAL_WIDTH, y); // Use constant for width
			ctx.stroke();
		}

		ctx.restore(); // Restore context state
	}, []);

	// Sets up the initial canvas state (styling, grid) and saves the first history snapshot.
	const setupCanvas = useCallback(() => {
		const ctx = ctxRef.current;
		if (!ctx || !canvasRef.current) {
			return;
		}

		// Set default line styles for drawing.
		ctx.lineCap = "round";
		ctx.lineJoin = "round";

		// Draw the initial background grid.
		drawGrid(ctx);

		// Capture the initial blank state (just the grid) as the first history entry.
		const initialState = ctx.getImageData(
			0,
			0,
			canvasRef.current.width,
			canvasRef.current.height,
		);
		// Push this initial state into the history.
		pushToHistory(initialState);
	}, [drawGrid, pushToHistory]);

	// It keeps the visual canvas synchronized with the application state managed by the DrawingProvider.
	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = ctxRef.current;
		if (!canvas || !ctx) {
			return;
		}

		// Clear the canvas completely before redrawing.
		ctx.clearRect(0, 0, INITIAL_WIDTH, INITIAL_HEIGHT);

		// Redraw the background grid.
		drawGrid(ctx);

		// Re-apply the current drawing settings (color, line width, etc.).
		// This is needed because clearRect might reset some context properties,
		// and settings might have changed since the last draw.
		ctx.strokeStyle = color;
		ctx.lineWidth = strokeWidth;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";

		// If there's a drawing state from history, paint it onto the canvas.
		if (currentImageData) {
			ctx.putImageData(currentImageData, 0, 0);
		}
	}, [currentImageData, color, strokeWidth, drawGrid]);

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
		setIsDrawing(true);
		const pos = getPosition(e);
		lastPosRef.current = pos; // Store it for the next segment.

		// Pencil-specific start logic (if any was needed)
		if (!ctxRef.current || tool.type !== tools.pencil.type) {
			return;
		}
		// For pencil, start a new path immediately.
		ctxRef.current.beginPath();
	};

	const draw = (e: React.MouseEvent | React.TouchEvent) => {
		if (!isDrawing || !ctxRef.current) {
			// Only draw if the mouse button is down/touch is active.
			return;
		}

		const pos = getPosition(e);
		const ctx = ctxRef.current;

		if (tool.type === tools.pencil.type) {
			// For the pencil, draw a line segment from the last position to the current one.
			ctx.beginPath(); // Start a new path segment
			ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
			ctx.lineTo(pos.x, pos.y);
			ctx.stroke(); // Draw the line on the canvas
		}

		lastPosRef.current = pos; // Update the last position for the next segment.
	};

	// Called when the mouse button is released, touch ends, or pointer leaves the canvas.
	const stopDrawing = () => {
		if (!isDrawing) {
			// Prevent saving state if we weren't actually drawing (e.g., mouseOut triggered early).
			return;
		}
		setIsDrawing(false);

		// Capture the current state of the canvas as an ImageData object.
		const canvas = canvasRef.current;
		const ctx = ctxRef.current;
		if (canvas && ctx) {
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			// Push this final state into our history via the context.
			pushToHistory(imageData);
		}
	};

	// Render the scrollable container and the canvas element within it.
	// Attach all the necessary event handlers for mouse and touch input.
	return (
		<div ref={containerRef} className="flex flex-1 bg-blue-300 overflow-auto">
			<canvas
				ref={canvasRef}
				className="flex flex-1"
				onMouseDown={startDrawing}
				onMouseMove={draw}
				onMouseUp={stopDrawing}
				onMouseOut={stopDrawing} // Stop drawing if mouse leaves canvas
				onBlur={stopDrawing} // Stop drawing if canvas loses focus
				onTouchStart={startDrawing}
				onTouchMove={draw}
				onTouchEnd={stopDrawing}
				// Prevent default touch actions like scrolling when drawing on the canvas
				style={{ touchAction: "none" }}
			/>
		</div>
	);
}

function App() {
	return (
		<DrawingProvider>
			<div className="w-dvw h-dvh flex flex-col bg-white overflow-hidden">
				<PrimaryToolbar />
				<div className="flex flex-1">
					<ToolOptionsToolbar />
					<Canvas />
				</div>
			</div>
		</DrawingProvider>
	);
}
