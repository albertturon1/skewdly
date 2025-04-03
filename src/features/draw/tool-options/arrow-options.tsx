import { useTools } from "@/features/draw/tools-context";
import { toolTypes } from "@/features/draw/tools";
import {
	arrowColorsArray,
	arrowStrokeWidthsArray,
} from "@/features/draw/tools/arrow";
import { ColorPicker } from "@/features/draw/tool-options/shared/color-picker";
import { StrokeWidthPicker } from "@/features/draw/tool-options/shared/stroke-width-picker";

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
