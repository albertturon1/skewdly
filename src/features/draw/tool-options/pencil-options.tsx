import { useDrawing } from "../drawing-context";
import { toolTypes } from "../tools";
import { pencilColorsArray } from "../tools/pencil";
import { pencilStrokeWidthsArray } from "../tools/pencil";
import { Tooltip } from "../tooltip";
import { ToolOptionsWrapper } from "./tool-options-wrapper";

export function PencilOptions() {
	const { editToolProperties, getTool } = useDrawing();

	const pencilTool = getTool(toolTypes.pencil);

	return (
		<ToolOptionsWrapper>
			<div className="flex flex-col gap-2 align-center">
				{pencilColorsArray.map((color) => (
					<Tooltip key={color.name} content={color.tooltip}>
						<div className="w-full flex items-center justify-center">
							<button
								type="button"
								className={`h-8 w-8 rounded-full self-center border ${
									pencilTool.color.value === color.value
										? "ring-2 ring-offset-2 ring-blue-500"
										: "border-gray-300"
								}`}
								style={{ backgroundColor: color.value }}
								onClick={() => {
									editToolProperties("pencil", { color });
								}}
							/>
						</div>
					</Tooltip>
				))}
			</div>
			<div className="flex flex-col">
				{pencilStrokeWidthsArray.map((stroke) => (
					<Tooltip key={stroke.width} content={stroke.tooltip}>
						<button
							type="button"
							className={`h-8 w-full flex items-center justify-center px-2 rounded hover:bg-gray-100 ${
								pencilTool.stroke.width === stroke.width ? "bg-gray-100" : ""
							}`}
							onClick={() => {
								editToolProperties("pencil", { stroke });
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
