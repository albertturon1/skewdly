import { useTools } from "../tools-context";
import { toolTypes } from "../tools";
import { diamondColorsArray, diamondStrokeWidthsArray } from "../tools/diamond";
import { ColorPicker } from "./shared/color-picker";
import { StrokeWidthPicker } from "./shared/stroke-width-picker";

export function DiamondOptions() {
	const { getTool } = useTools();
	const diamondTool = getTool(toolTypes.diamond);

	return (
		<>
			<ColorPicker
				colors={diamondColorsArray}
				toolType={toolTypes.diamond}
				selectedColor={diamondTool.color}
			/>
			<StrokeWidthPicker
				strokes={diamondStrokeWidthsArray}
				toolType={toolTypes.diamond}
				selectedStroke={diamondTool.stroke}
			/>
		</>
	);
}
