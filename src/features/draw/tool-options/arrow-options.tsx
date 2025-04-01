import { useTools } from "../tools-context";
import { toolTypes } from "../tools";
import { arrowColorsArray, arrowStrokeWidthsArray } from "../tools/arrow";
import { ColorPicker } from "./shared/color-picker";
import { StrokeWidthPicker } from "./shared/stroke-width-picker";

export function ArrowOptions() {
	const { getTool } = useTools();
	const arrowTool = getTool(toolTypes.arrow);

	return (
		<>
			<ColorPicker
				colors={arrowColorsArray}
				toolType={toolTypes.arrow}
				selectedColor={arrowTool.color}
			/>
			<StrokeWidthPicker
				strokes={arrowStrokeWidthsArray}
				toolType={toolTypes.arrow}
				selectedStroke={arrowTool.stroke}
			/>
		</>
	);
}
