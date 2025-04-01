import { useTools } from "../tools-context";
import { toolTypes } from "../tools";
import { lineColorsArray, lineStrokeWidthsArray } from "../tools/line";
import { Tooltip } from "../tooltip";
import { ToolOptionsWrapper } from "./tool-options-wrapper";

export function LineOptions() {
	const { editToolProperties, getTool } = useTools();

	const lineTool = getTool(toolTypes.line);

	return (
		<ToolOptionsWrapper>
			<div className="flex flex-col gap-2 align-center">
				{lineColorsArray.map((color) => (
					<Tooltip key={color.name} content={color.tooltip}>
						<div
							key={color.name}
							className="w-full flex items-center justify-center"
						>
							<button
								type="button"
								className={`h-8 w-8 rounded-full self-center border ${
									lineTool.color.value === color.value
										? "ring-2 ring-offset-2 ring-blue-500"
										: "border-gray-300"
								}`}
								style={{ backgroundColor: color.value }}
								onClick={() => {
									editToolProperties("line", { color });
								}}
							/>
						</div>
					</Tooltip>
				))}
			</div>
			<div className="flex flex-col">
				{lineStrokeWidthsArray.map((stroke) => (
					<Tooltip key={stroke.size} content={stroke.tooltip}>
						<button
							type="button"
							className={`h-8 w-full flex items-center justify-center px-1 rounded hover:bg-gray-100 ${
								lineTool.stroke.size === stroke.size ? "bg-gray-100" : ""
							}`}
							onClick={() => {
								editToolProperties("line", { stroke });
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
