import { useDrawing } from "../drawing-context";
import { eraserStrokeWidthsArray, toolTypes } from "../tools";
import { Tooltip } from "../tooltip";
import { ToolOptionsWrapper } from "./tool-options-wrapper";

export function EraserOptions() {
	const { editToolProperties, getTool } = useDrawing();

	const eraserTool = getTool(toolTypes.eraser);
	if (!eraserTool) {
		return null;
	}

	return (
		<ToolOptionsWrapper>
			<div className="flex flex-col gap-2">
				{eraserStrokeWidthsArray.map((sw) => (
					<Tooltip key={sw.width} content={sw.tooltip}>
						<button
							type="button"
							className={`h-8 w-full flex items-center justify-center px-2 rounded hover:bg-gray-100 ${
								eraserTool.strokeWidth === sw.width ? "bg-gray-100" : ""
							}`}
							onClick={() => {
								editToolProperties("eraser", { strokeWidth: sw.width });
							}}
						>
							<div
								className={"bg-black rounded-full"}
								style={{
									height: `${sw.width}px`,
									width: `${sw.width * 3}px`,
								}}
							/>
						</button>
					</Tooltip>
				))}
			</div>
		</ToolOptionsWrapper>
	);
}
