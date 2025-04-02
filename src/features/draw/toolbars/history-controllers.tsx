import { ToolbarButton } from "./toolbar-button";
import { useTools } from "../tools-context";

export function HistoryControllers() {
	const { undo, redo, clearCanvas, canRedo, canUndo } = useTools();

	return (
		<div className="flex gap-1 justify-center items-stretch">
			<ToolbarButton onClick={undo} disabled={!canUndo}>
				<img src="/undo.svg" alt="Undo" className={"h-4 w-4"} />
			</ToolbarButton>
			<ToolbarButton onClick={redo} disabled={!canRedo}>
				<img src="/redo.svg" alt="Redo" className={"h-4 w-4"} />
			</ToolbarButton>

			<ToolbarButton onClick={clearCanvas} disabled={!canRedo && !canUndo}>
				<img src="/delete.svg" alt="Clean canvas" className={"h-4 w-4"} />
			</ToolbarButton>
		</div>
	);
}
