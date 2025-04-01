import { useTools } from "../tools-context";
import { toolTypes } from "../tools";
import { pencilColorsArray, pencilStrokeWidthsArray } from "../tools/pencil";
import { ColorPicker } from "./shared/color-picker";
import { StrokeWidthPicker } from "./shared/stroke-width-picker";

export function PencilOptions() {
	const { getTool } = useTools();
	const pencilTool = getTool(toolTypes.pencil);

	return (
		<>
			<ColorPicker
				colors={pencilColorsArray}
				toolType={toolTypes.pencil}
				selectedColor={pencilTool.color}
			/>
			<StrokeWidthPicker
				strokes={pencilStrokeWidthsArray}
				toolType={toolTypes.pencil}
				selectedStroke={pencilTool.stroke}
			/>
		</>
	);
}
