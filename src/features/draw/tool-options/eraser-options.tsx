import { useTools } from "@/features/draw/tools-context";
import { toolTypes } from "@/features/draw/tools";
import { eraserStrokeWidthsArray } from "@/features/draw/tools/eraser";
import { StrokeWidthPicker } from "@/features/draw/tool-options/shared/stroke-width-picker";

export function EraserOptions() {
	const { getTool } = useTools();
	const eraserTool = getTool(toolTypes.eraser);

	return (
		<>
			<StrokeWidthPicker
				strokes={eraserStrokeWidthsArray}
				toolType={toolTypes.eraser}
				selectedStroke={eraserTool.stroke}
				variant="dot"
			/>
		</>
	);
}
