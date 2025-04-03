import { useTools } from "@/features/draw/tools-context";
import { toolTypes } from "@/features/draw/tools";
import {
	pencilColorsArray,
	pencilStrokeWidthsArray,
} from "@/features/draw/tools/pencil";
import { ColorPicker } from "@/features/draw/tool-options/shared/color-picker";
import { StrokeWidthPicker } from "@/features/draw/tool-options/shared/stroke-width-picker";

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
