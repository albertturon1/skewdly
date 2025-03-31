import { useTools } from "../tools-context";
import { toolTypes } from "../tools";
import { eraserStrokeWidthsArray } from "../tools/eraser";
import { Tooltip } from "../tooltip";
import { ToolOptionsWrapper } from "./tool-options-wrapper";

export function EraserOptions() {
	const { editToolProperties, getTool } = useTools();

	const eraserTool = getTool(toolTypes.eraser);

	return (
		<ToolOptionsWrapper>
			<div className="flex flex-col gap-2">
				{eraserStrokeWidthsArray.map((stroke) => (
					<Tooltip key={stroke.width} content={stroke.tooltip}>
						<button
							type="button"
							className={`h-8 w-full flex items-center justify-center px-2 rounded  hover:bg-gray-100 ${
								eraserTool.stroke.width === stroke.width ? "bg-gray-100" : ""
							}`}
							onClick={() => {
								editToolProperties("eraser", { stroke });
							}}
						>
							<div
								className={"bg-black rounded-full"}
								style={{
									height: `${stroke.width}px`,
									width: `${stroke.width}px`,
								}}
							/>
						</button>
					</Tooltip>
				))}
			</div>
		</ToolOptionsWrapper>
	);
}
