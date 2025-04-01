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
					<Tooltip key={stroke.size} content={stroke.tooltip}>
						<button
							type="button"
							className={`min-h-8 w-full flex items-center justify-center px-2 rounded  hover:bg-gray-100 ${
								eraserTool.stroke.size === stroke.size ? "bg-gray-100" : ""
							}`}
							onClick={() => {
								editToolProperties("eraser", { stroke });
							}}
						>
							<div
								className={"bg-black rounded-full"}
								style={{
									height: `${stroke.size}px`,
									width: `${stroke.size}px`,
								}}
							/>
						</button>
					</Tooltip>
				))}
			</div>
		</ToolOptionsWrapper>
	);
}
