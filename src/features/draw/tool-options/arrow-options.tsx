import { useTools } from "../tools-context";
import { toolTypes } from "../tools";
import { arrowColorsArray, arrowStrokeWidthsArray } from "../tools/arrow";
import { Tooltip } from "../tooltip";
import { ToolOptionsWrapper } from "./tool-options-wrapper";

export function ArrowOptions() {
	const { editToolProperties, getTool } = useTools();

	const arrowTool = getTool(toolTypes.arrow);

	return (
		<ToolOptionsWrapper>
			<div className="flex flex-col gap-2 align-center">
				{arrowColorsArray.map((color) => (
					<Tooltip key={color.name} content={color.tooltip}>
						<div
							key={color.name}
							className="w-full flex items-center justify-center"
						>
							<button
								type="button"
								className={`h-8 w-8 rounded-full self-center border ${
									arrowTool.color.value === color.value
										? "ring-2 ring-offset-2 ring-blue-500"
										: "border-gray-300"
								}`}
								style={{ backgroundColor: color.value }}
								onClick={() => {
									editToolProperties("arrow", { color });
								}}
							/>
						</div>
					</Tooltip>
				))}
			</div>
			<div className="flex flex-col">
				{arrowStrokeWidthsArray.map((stroke) => (
					<Tooltip key={stroke.size} content={stroke.tooltip}>
						<button
							type="button"
							className={`h-8 w-full flex items-center justify-center px-1 rounded hover:bg-gray-100 ${
								arrowTool.stroke.size === stroke.size ? "bg-gray-100" : ""
							}`}
							onClick={() => {
								editToolProperties("arrow", { stroke });
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
