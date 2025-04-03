import { useTools } from "@/features/draw/tools-context";
import { toolTypes } from "@/features/draw/tools";
import {
	lineColorsArray,
	lineStrokeWidthsArray,
} from "@/features/draw/tools/line";
import { ColorPicker } from "@/features/draw/tool-options/shared/color-picker";
import { StrokeWidthPicker } from "@/features/draw/tool-options/shared/stroke-width-picker";

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
