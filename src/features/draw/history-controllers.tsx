import { useTools } from "./tools-context";

export function HistoryControllers() {
	const { undo, redo, clearCanvas, canRedo, canUndo } = useTools();

	return (
		<>
			<div className="flex items-center gap-1 justify-center">
				<button
					type="button"
					className="p-2 rounded  hover:bg-gray-100 disabled:opacity-50"
					onClick={undo}
					disabled={!canUndo}
				>
					↩
				</button>

				<button
					type="button"
					className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
					onClick={redo}
					disabled={!canRedo}
				>
					↪
				</button>
				<button
					type="button"
					className={
						"p-2 rounded hover:bg-gray-100 border-gray-200 disabled:opacity-50 "
					}
					onClick={clearCanvas}
					disabled={!canRedo && !canUndo}
				>
					⌫
				</button>
			</div>
		</>
	);
}
