import { useDrawing } from "./drawing-context";
import { toolsArray } from "./tools";

export function PrimaryToolbar() {
	const {
		tool,
		setTool,
		isDrawing,
		undo,
		redo,
		clearCanvas,
		canRedo,
		canUndo,
	} = useDrawing();

	return (
		<div className="p-2 border-b border-gray-200 flex items-center gap-2 bg-white">
			{/* Tools Section */}
			<div className="border border-gray-200 rounded-md overflow-hidden flex">
				{toolsArray.map((t) => (
					<button
						key={t.name}
						type="button"
						className={`p-2 h-10 w-10 flex items-center justify-center text-lg hover:bg-gray-100 ${
							tool.type === t.type ? "bg-gray-100" : ""
						}`}
						onClick={() => {
							setTool(t);
						}}
					>
						{t.icon}
					</button>
				))}
			</div>

			<div className="h-6 w-px bg-gray-300 mx-1" />

			{/* Action Buttons */}
			<div className="flex items-center gap-1">
				<button
					type="button"
					className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={undo}
					disabled={!canUndo || isDrawing}
				>
					↩
				</button>

				<button
					type="button"
					className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={redo}
					disabled={!canRedo || isDrawing}
				>
					↪
				</button>
			</div>

			<div className="h-6 w-px bg-gray-300 mx-1" />

			{/* More Actions */}
			<div className="flex items-center gap-1">
				<button
					type="button"
					className="px-3 py-1 text-sm rounded hover:bg-gray-100 border border-gray-200"
					onClick={clearCanvas}
				>
					Clear
				</button>
			</div>
		</div>
	);
}
