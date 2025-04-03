import { useTools } from "@/features/draw/tools-context";
import { toolTypes } from "@/features/draw/tools";
import {
	rectangleColorsArray,
	rectangleStrokeWidthsArray,
} from "@/features/draw/tools/rectangle";
import { ColorPicker } from "@/features/draw/tool-options/shared/color-picker";
import { StrokeWidthPicker } from "@/features/draw/tool-options/shared/stroke-width-picker";

export function RectangleOptions() {
	const { getTool } = useTools();
	const rectangleTool = getTool(toolTypes.rectangle);

	return (
		<>
			<ColorPicker
				colors={rectangleColorsArray}
				toolType={toolTypes.rectangle}
				selectedColor={rectangleTool.color}
			/>
			<StrokeWidthPicker
				strokes={rectangleStrokeWidthsArray}
				toolType={toolTypes.rectangle}
				selectedStroke={rectangleTool.stroke}
			/>
		</>
	);
}
