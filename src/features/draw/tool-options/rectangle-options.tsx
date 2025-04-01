import { useTools } from "../tools-context";
import { toolTypes } from "../tools";
import {
	rectangleColorsArray,
	rectangleStrokeWidthsArray,
} from "../tools/rectangle";
import { ColorPicker } from "./shared/color-picker";
import { StrokeWidthPicker } from "./shared/stroke-width-picker";

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
