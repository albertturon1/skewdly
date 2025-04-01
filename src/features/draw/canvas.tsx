import { useCallback, useEffect, useRef } from "react";
import { EraserCursor } from "./tools/eraser";
import { useTools } from "./tools-context";
import { toolTypes } from "./tools";

const INITIAL_SIZE = 2000;

/**
 * The main Canvas component handles user input (mouse/touch), interacts with the ToolsContext,
 * and renders the actual <canvas> element.
 */
export function Canvas() {
	// canvasRef - Ref to access the underlying <canvas> HTML element directly.
	const canvasRef = useRef<HTMLCanvasElement>(null);
	// containerRef - Ref to access the container div that holds the canvas.
	// Used here to calculate the correct mouse/touch position relative to the canvas, especially when the container might be scrolled or positioned differently.
	const containerRef = useRef<HTMLDivElement>(null);
	// ctxRef - Ref to store the 2D rendering context of the canvas.
	// This context object is used for all drawing operations (lines, shapes, colors, etc.).
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
	// Ref to keep track of the last pointer position.
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
		canUndo,
	} = useTools();

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
		canvas.width = INITIAL_SIZE;
		canvas.height = INITIAL_SIZE;
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
		const canvas = canvasRef.current;
		if (!ctx || !canvas) {
			return;
		}

		// Set default line styles for drawing.
		ctx.lineCap = "round";
		ctx.lineJoin = "round";

		// Capture the initial blank state (just the grid) as the first history entry.
		const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
		// Push this initial state into the history.
		pushToHistory(initialState);
	}, [pushToHistory]);

	// It keeps the visual canvas synchronized with the application state managed by the ToolsProvider.
	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = ctxRef.current;
		if (!canvas || !ctx) {
			return;
		}

		// Clear the canvas completely before redrawing.
		ctx.clearRect(0, 0, INITIAL_SIZE, INITIAL_SIZE);

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
		const ctx = ctxRef.current;
		if (!ctx) {
			return;
		}

		// Get the exact x and y coordinates of the user's click or touch
		const pos = getPosition(e);

		// Save the current position to track the previous point for smooth drawing.
		lastPosRef.current = pos;

		switch (activeTool) {
			case toolTypes.pencil: {
				const tool = getTool(activeTool);
				if (tool.active) {
					return;
				}

				// Draw initial circle at the starting point
				ctx.beginPath();
				// Draw a small circle (arc()) at pos.x, pos.y with half of stroke width as the radius
				ctx.arc(pos.x, pos.y, tool.stroke.size / 2, 0, Math.PI * 2);
				// Set the fill color to the tool's color
				ctx.fillStyle = tool.color.value;
				// Fill the circle with the color
				ctx.fill();
				editToolProperties(toolTypes.pencil, { active: true });
				break;
			}
			case toolTypes.eraser: {
				const tool = getTool(activeTool);
				// Don't allow erasing if there's nothing to undo (only initial state exists)
				if (tool.active || !canUndo) {
					return;
				}

				editToolProperties(toolTypes.eraser, { active: true });

				ctx.save(); // Save the current state of the canvas
				ctx.globalCompositeOperation = "destination-out"; // Change the drawing mode to "destination-out", which erases instead of drawing.
				ctx.beginPath(); // Start a new shape
				ctx.arc(pos.x, pos.y, tool.stroke.size / 2, 0, Math.PI * 2); // Draw a circle at the starting position
				ctx.fill(); // Erase at the initial touch point
				ctx.restore(); // Restore the original state of the canvas

				break;
			}
			case toolTypes.rectangle: {
				const tool = getTool(activeTool);
				if (tool.active) {
					return;
				}

				editToolProperties(toolTypes.rectangle, {
					active: true,
					startX: pos.x,
					startY: pos.y,
				});
				break;
			}
			case toolTypes.ellipse: {
				const tool = getTool(activeTool);
				if (tool.active) {
					return;
				}

				editToolProperties(toolTypes.ellipse, {
					active: true,
					startX: pos.x,
					startY: pos.y,
				});
				break;
			}
			case toolTypes.arrow: {
				const tool = getTool(activeTool);
				if (tool.active) {
					return;
				}

				editToolProperties(toolTypes.arrow, {
					active: true,
					startX: pos.x,
					startY: pos.y,
				});
				break;
			}
			case toolTypes.line: {
				const tool = getTool(activeTool);
				if (tool.active) {
					return;
				}

				editToolProperties(toolTypes.line, {
					active: true,
					startX: pos.x,
					startY: pos.y,
				});
				break;
			}
			case toolTypes.diamond: {
				const tool = getTool(activeTool);
				if (tool.active) {
					return;
				}

				editToolProperties(toolTypes.diamond, {
					active: true,
					startX: pos.x,
					startY: pos.y,
				});
				break;
			}
			default:
				break;
		}
	};

	const draw = (e: React.MouseEvent | React.TouchEvent) => {
		const ctx = ctxRef.current;
		const canvas = canvasRef.current;

		if (!ctx || !canvas) {
			return;
		}

		const pos = getPosition(e);
		const lastPos = lastPosRef.current;

		switch (activeTool) {
			case toolTypes.pencil: {
				const tool = getTool(activeTool);

				if (!tool.active) {
					return;
				}

				ctx.beginPath();
				ctx.moveTo(lastPos.x, lastPos.y); // Move to the previous position
				ctx.lineTo(pos.x, pos.y); // Draw a line to the new position
				ctx.lineWidth = tool.stroke.size; // Set the line width to the tool's stroke width
				ctx.strokeStyle = tool.color.value; // Set the stroke color to the tool's color
				ctx.stroke(); // Draw the line
				ctx.arc(pos.x, pos.y, tool.stroke.size / 2, 0, Math.PI * 2); // Draw a small circle at the new position
				ctx.fillStyle = tool.color.value; // Set the fill color to the tool's color
				ctx.fill(); // Fill the circle
				break;
			}
			case toolTypes.eraser: {
				const tool = getTool(activeTool);
				// Don't allow erasing if there's nothing to undo (only initial state exists)
				if (!tool.active || !canUndo) {
					return;
				}

				ctx.save();
				ctx.globalCompositeOperation = "destination-out";

				// START Erase continuously by drawing a line between lastPos and pos
				ctx.beginPath();
				ctx.moveTo(lastPos.x, lastPos.y);
				ctx.lineTo(pos.x, pos.y);
				ctx.lineWidth = tool.stroke.size;
				ctx.stroke();
				// END Erase continuously by drawing a line between lastPos and pos

				// START Erase a circular shape
				ctx.beginPath();
				ctx.arc(pos.x, pos.y, tool.stroke.size / 2, 0, Math.PI * 2);
				ctx.fill();
				// END Erase a circular shape

				ctx.globalCompositeOperation = "source-over"; // Switch back to normal drawing mode
				ctx.restore(); // Restore saved state so future operations work normally
				break;
			}
			case toolTypes.rectangle: {
				const tool = getTool(activeTool);

				if (!tool.active) {
					return;
				}

				// Clear the canvas and redraw the previous state
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				if (currentImageData) {
					ctx.putImageData(currentImageData, 0, 0);
				}

				// Calculate rectangle dimensions
				const width = pos.x - tool.startX;
				const height = pos.y - tool.startY;

				// Draw the new rectangle
				ctx.beginPath();
				ctx.strokeStyle = tool.color.value;
				ctx.lineWidth = tool.stroke.size;
				ctx.strokeRect(tool.startX, tool.startY, width, height);
				break;
			}
			case toolTypes.ellipse: {
				const tool = getTool(activeTool);

				if (!tool.active) {
					return;
				}

				// Clear the canvas and redraw the previous state
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				if (currentImageData) {
					ctx.putImageData(currentImageData, 0, 0);
				}

				// Calculate ellipse dimensions
				const width = Math.abs(pos.x - tool.startX);
				const height = Math.abs(pos.y - tool.startY);
				const centerX = tool.startX + (pos.x - tool.startX) / 2;
				const centerY = tool.startY + (pos.y - tool.startY) / 2;

				// Draw the new ellipse
				ctx.beginPath();
				ctx.strokeStyle = tool.color.value;
				ctx.lineWidth = tool.stroke.size;
				ctx.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, 2 * Math.PI);
				ctx.stroke();
				break;
			}
			case toolTypes.arrow: {
				const tool = getTool(activeTool);
				if (!tool.active) {
					return;
				}

				// Clear the canvas and redraw the previous state
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				if (currentImageData) {
					ctx.putImageData(currentImageData, 0, 0);
				}

				// Calculate arrow dimensions
				const dx = pos.x - tool.startX;
				const dy = pos.y - tool.startY;
				const angle = Math.atan2(dy, dx);
				const length = Math.sqrt(dx * dx + dy * dy);
				const arrowHeadLength = Math.min(20, length / 3); // Adjust arrow head size based on length

				// Draw the arrow line
				ctx.beginPath();
				ctx.strokeStyle = tool.color.value;
				ctx.lineWidth = tool.stroke.size;
				ctx.moveTo(tool.startX, tool.startY);
				ctx.lineTo(pos.x, pos.y);
				ctx.stroke();

				// Draw the arrow head
				ctx.beginPath();
				ctx.moveTo(pos.x, pos.y);
				ctx.lineTo(
					pos.x - arrowHeadLength * Math.cos(angle - Math.PI / 6),
					pos.y - arrowHeadLength * Math.sin(angle - Math.PI / 6),
				);
				ctx.moveTo(pos.x, pos.y);
				ctx.lineTo(
					pos.x - arrowHeadLength * Math.cos(angle + Math.PI / 6),
					pos.y - arrowHeadLength * Math.sin(angle + Math.PI / 6),
				);
				ctx.stroke();
				break;
			}
			case toolTypes.line: {
				const tool = getTool(activeTool);
				if (!tool.active) {
					return;
				}

				// Clear the canvas and redraw the previous state
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				if (currentImageData) {
					ctx.putImageData(currentImageData, 0, 0);
				}

				// Draw the line
				ctx.beginPath();
				ctx.strokeStyle = tool.color.value;
				ctx.lineWidth = tool.stroke.size;
				ctx.lineJoin = "round"; // Make corners rounded
				ctx.lineCap = "round"; // Make line ends rounded
				ctx.moveTo(tool.startX, tool.startY);
				ctx.lineTo(pos.x, pos.y);
				ctx.stroke();
				break;
			}
			case toolTypes.diamond: {
				const tool = getTool(activeTool);
				if (!tool.active) {
					return;
				}

				// Clear the canvas and redraw the previous state
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				if (currentImageData) {
					ctx.putImageData(currentImageData, 0, 0);
				}

				// Calculate diamond dimensions
				const width = pos.x - tool.startX;
				const height = pos.y - tool.startY;
				const centerX = tool.startX + width / 2;
				const centerY = tool.startY + height / 2;

				// Draw the diamond with adjusted settings
				ctx.beginPath();
				ctx.strokeStyle = tool.color.value;
				ctx.lineWidth = tool.stroke.size;
				ctx.lineJoin = "round"; // Make corners rounded
				ctx.lineCap = "round"; // Make line ends rounded

				// Calculate points with slight inward offset for narrow diamonds
				const offsetX =
					width === 0 ? 0 : Math.sign(width) * Math.min(Math.abs(width) / 8, 2);
				const offsetY =
					height === 0
						? 0
						: Math.sign(height) * Math.min(Math.abs(height) / 8, 2);

				// Draw the diamond shape
				ctx.moveTo(centerX, tool.startY + offsetY); // Top point
				ctx.lineTo(tool.startX + width - offsetX, centerY); // Right point
				ctx.lineTo(centerX, tool.startY + height - offsetY); // Bottom point
				ctx.lineTo(tool.startX + offsetX, centerY); // Left point
				ctx.closePath();

				ctx.stroke();
				break;
			}
			default:
				break;
		}

		lastPosRef.current = pos; // Update lastPosRef to store the current cursor position for the next draw call
	};

	const stopDrawing = () => {
		const canvas = canvasRef.current;
		const ctx = ctxRef.current;

		if (!canvas || !ctx) {
			return;
		}

		switch (activeTool) {
			case toolTypes.pencil: {
				const tool = getTool(activeTool);

				if (!tool.active) {
					return;
				}

				editToolProperties(toolTypes.pencil, { active: false });

				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				pushToHistory(imageData);
				break;
			}
			case toolTypes.eraser: {
				const tool = getTool(activeTool);

				if (!tool.active || !canUndo) {
					return;
				}

				editToolProperties(toolTypes.eraser, { active: false });

				// Save the state after erasing
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				pushToHistory(imageData);
				break;
			}
			case toolTypes.rectangle: {
				const tool = getTool(activeTool);

				if (!tool.active) {
					return;
				}

				editToolProperties(toolTypes.rectangle, { active: false });

				// Save the state after drawing the rectangle
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				pushToHistory(imageData);
				break;
			}
			case toolTypes.ellipse: {
				const tool = getTool(activeTool);

				if (!tool.active) {
					return;
				}

				editToolProperties(toolTypes.ellipse, { active: false });

				// Save the state after drawing the ellipse
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				pushToHistory(imageData);
				break;
			}
			case toolTypes.arrow: {
				const tool = getTool(activeTool);

				if (!tool.active) {
					return;
				}

				editToolProperties(toolTypes.arrow, { active: false });

				// Save the state after drawing the arrow
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				pushToHistory(imageData);
				break;
			}
			case toolTypes.line: {
				const tool = getTool(activeTool);

				if (!tool.active) {
					return;
				}

				editToolProperties(toolTypes.line, { active: false });

				// Save the state after drawing the line
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				pushToHistory(imageData);
				break;
			}
			case toolTypes.diamond: {
				const tool = getTool(activeTool);

				if (!tool.active) {
					return;
				}

				editToolProperties(toolTypes.diamond, { active: false });

				// Save the state after drawing the diamond
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				pushToHistory(imageData);
				break;
			}
			default:
				break;
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

	function getCursor() {
		switch (activeTool) {
			case toolTypes.eraser:
				// return 'url("/eraser.svg") -10 -10, auto';
				return EraserCursor(getTool(activeTool).stroke.size);
			case toolTypes.pencil:
				return "crosshair";
			default:
				return "default";
		}
	}

	// Render the scrollable container and the canvas element within it.
	// Attach all the necessary event handlers for mouse and touch input.
	return (
		<div ref={containerRef} className="flex flex-1 bg-[#F0EDE5] overflow-auto">
			<canvas
				ref={canvasRef}
				className={"flex flex-1"}
				onMouseDown={startDrawing}
				onMouseMove={draw}
				onMouseUp={stopDrawing}
				onMouseOut={stopDrawing}
				onBlur={stopDrawing}
				onTouchStart={startDrawing}
				onTouchMove={draw}
				onTouchEnd={stopDrawing}
				style={{ touchAction: "none", cursor: getCursor() }}
			/>
		</div>
	);
}
