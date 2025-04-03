import { useTools } from "@/features/draw/tools-context";
import { toolTypes } from "@/features/draw/tools";
import {
	diamondColorsArray,
	diamondStrokeWidthsArray,
} from "@/features/draw/tools/diamond";
import { ColorPicker } from "@/features/draw/tool-options/shared/color-picker";
import { StrokeWidthPicker } from "@/features/draw/tool-options/shared/stroke-width-picker";

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
