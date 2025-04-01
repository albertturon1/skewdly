import { useTools } from "../tools-context";
import { toolTypes } from "../tools";
import { lineColorsArray, lineStrokeWidthsArray } from "../tools/line";
import { ColorPicker } from "./shared/color-picker";
import { StrokeWidthPicker } from "./shared/stroke-width-picker";

export function LineOptions() {
	const { getTool } = useTools();
	const lineTool = getTool(toolTypes.line);

	return (
		<>
			<ColorPicker
				colors={lineColorsArray}
				toolType={toolTypes.line}
				selectedColor={lineTool.color}
			/>
			<StrokeWidthPicker
				strokes={lineStrokeWidthsArray}
				toolType={toolTypes.line}
				selectedStroke={lineTool.stroke}
			/>
		</>
	);
}
