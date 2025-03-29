import { useDrawing } from "../drawing-context";
import {
	pencilColorsArray,
	strokeWidthsArray as pencilStrokeWidthsArray,
	toolTypes,
} from "../tools";
import { Tooltip } from "../tooltip";
import { ToolOptionsWrapper } from "./tool-options-wrapper";

export function PencilOptions() {
	const { editToolProperties, getTool } = useDrawing();

	const pencilTool = getTool(toolTypes.pencil);
	if (!pencilTool) {
		return null;
	}

	return (
		<ToolOptionsWrapper>
			<div className="flex flex-col gap-2">
				{pencilColorsArray.map((c) => (
					<Tooltip key={c.name} content={c.tooltip}>
						<button
							type="button"
							className={`h-8 w-8 rounded-full border ${
								pencilTool.color === c.value
									? "ring-2 ring-offset-2 ring-blue-500"
									: "border-gray-300"
							}`}
							style={{ backgroundColor: c.value }}
							onClick={() => {
								editToolProperties("pencil", { color: c.value });
							}}
						/>
					</Tooltip>
				))}
			</div>
			<div className="flex flex-col">
				{pencilStrokeWidthsArray.map((sw) => (
					<Tooltip key={sw.width} content={sw.tooltip}>
						<button
							type="button"
							className={`h-8 w-full flex items-center justify-center px-2 rounded hover:bg-gray-100 ${
								pencilTool.strokeWidth === sw.width ? "bg-gray-100" : ""
							}`}
							onClick={() => {
								editToolProperties("pencil", { strokeWidth: sw.width });
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
