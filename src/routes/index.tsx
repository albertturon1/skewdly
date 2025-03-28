import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { DrawingProvider, useDrawing } from "../features/draw/drawing-context";

export const Route = createFileRoute("/")({
	component: App,
});

const INITIAL_WIDTH = 2000;
const INITIAL_HEIGHT = 2000;

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
	const { color, strokeWidth, isDrawing, setIsDrawing } = useDrawing();
	const lastPosRef = useRef({ x: 0, y: 0 });

	// Initialize canvas size and context
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		const ctx = canvas.getContext("2d", { willReadFrequently: true });
		if (!ctx) {
			return;
		}

		// Set canvas size
		canvas.width = INITIAL_WIDTH;
		canvas.height = INITIAL_HEIGHT;
		ctxRef.current = ctx;

		// Initial setup
		ctx.lineCap = "round";
		ctx.lineJoin = "round";

		// Draw grid
		drawGrid(ctx);
	}, []);

	const drawGrid = (ctx: CanvasRenderingContext2D) => {
		ctx.save();
		ctx.strokeStyle = "#ddd";
		ctx.lineWidth = 1;

		for (let x = 0; x <= INITIAL_WIDTH; x += 50) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, INITIAL_WIDTH);
			ctx.stroke();
		}

		for (let y = 0; y <= INITIAL_HEIGHT; y += 50) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(INITIAL_HEIGHT, y);
			ctx.stroke();
		}

		ctx.restore();
	};

	const getPosition = (e: React.MouseEvent | React.TouchEvent) => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) {
			return { x: 0, y: 0 };
		}

		const rect = container.getBoundingClientRect();
		let clientX: number;
		let clientY: number;

		if ("touches" in e) {
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
		} else {
			clientX = e.clientX;
			clientY = e.clientY;
		}

		const x = clientX - rect.left + container.scrollLeft;
		const y = clientY - rect.top + container.scrollTop;

		return { x, y };
	};

	const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
		setIsDrawing(true);
		const pos = getPosition(e);
		lastPosRef.current = pos;

		if (ctxRef.current) {
			ctxRef.current.beginPath();
			ctxRef.current.arc(pos.x, pos.y, strokeWidth / 2, 0, Math.PI * 2);
			ctxRef.current.fillStyle = color;
			ctxRef.current.fill();
		}
	};

	const draw = (e: React.MouseEvent | React.TouchEvent) => {
		if (!isDrawing || !ctxRef.current) {
			return;
		}

		const pos = getPosition(e);
		const ctx = ctxRef.current;

		ctx.strokeStyle = color;
		ctx.lineWidth = strokeWidth;

		ctx.beginPath();
		ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
		ctx.lineTo(pos.x, pos.y);
		ctx.stroke();

		lastPosRef.current = pos;
	};

	const stopDrawing = () => {
		setIsDrawing(false);
	};

	return (
		<div ref={containerRef} className="flex flex-1 bg-blue-300">
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
	return (
		<DrawingProvider>
			<Canvas />
		</DrawingProvider>
	);
}
