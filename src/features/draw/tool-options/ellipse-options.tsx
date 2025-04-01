import { useTools } from "../tools-context";
import { toolTypes } from "../tools";
import { ellipseColorsArray, ellipseStrokeWidthsArray } from "../tools/ellipse";
import { ColorPicker } from "./shared/color-picker";
import { StrokeWidthPicker } from "./shared/stroke-width-picker";

export function EllipseOptions() {
	const { getTool } = useTools();
	const ellipseTool = getTool(toolTypes.ellipse);

	return (
		<>
			<ColorPicker
				colors={ellipseColorsArray}
				toolType={toolTypes.ellipse}
				selectedColor={ellipseTool.color}
			/>
			<StrokeWidthPicker
				strokes={ellipseStrokeWidthsArray}
				toolType={toolTypes.ellipse}
				selectedStroke={ellipseTool.stroke}
			/>
		</>
	);
}
