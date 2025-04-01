import { useTools } from "../tools-context";
import { toolTypes } from "../tools";
import {
	rectangleColorsArray,
	rectangleStrokeWidthsArray,
} from "../tools/rectangle";
import { Tooltip } from "../tooltip";
import { ToolOptionsWrapper } from "./tool-options-wrapper";

export function RectangleOptions() {
	const { editToolProperties, getTool } = useTools();

	const rectangleTool = getTool(toolTypes.rectangle);

	return (
		<ToolOptionsWrapper>
			<div className="flex flex-col gap-2 align-center">
				{rectangleColorsArray.map((color) => (
					<Tooltip key={color.name} content={color.tooltip}>
						<div
							key={color.name}
							className="w-full flex items-center justify-center"
						>
							<button
								type="button"
								className={`h-8 w-8 rounded-full self-center border ${
									rectangleTool.color.value === color.value
										? "ring-2 ring-offset-2 ring-blue-500"
										: "border-gray-300"
								}`}
								style={{ backgroundColor: color.value }}
								onClick={() => {
									editToolProperties("rectangle", { color });
								}}
							/>
						</div>
					</Tooltip>
				))}
			</div>
			<div className="flex flex-col">
				{rectangleStrokeWidthsArray.map((stroke) => (
					<Tooltip key={stroke.size} content={stroke.tooltip}>
						<button
							type="button"
							className={`h-8 w-full flex items-center justify-center px-1 rounded hover:bg-gray-100 ${
								rectangleTool.stroke.size === stroke.size ? "bg-gray-100" : ""
							}`}
							onClick={() => {
								editToolProperties("rectangle", { stroke });
							}}
						>
							<div
								className={"bg-black rounded w-full"}
								style={{
									height: `${stroke.size}px`,
								}}
							/>
						</button>
					</Tooltip>
				))}
			</div>
		</ToolOptionsWrapper>
	);
}
