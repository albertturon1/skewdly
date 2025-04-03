import { useTools } from "@/features/draw/tools-context";
import { toolTypes } from "@/features/draw/tools";
import {
	ellipseColorsArray,
	ellipseStrokeWidthsArray,
} from "@/features/draw/tools/ellipse";
import { ColorPicker } from "@/features/draw/tool-options/shared/color-picker";
import { StrokeWidthPicker } from "@/features/draw/tool-options/shared/stroke-width-picker";

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
