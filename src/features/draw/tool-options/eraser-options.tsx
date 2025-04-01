import { useTools } from "../tools-context";
import { toolTypes } from "../tools";
import { eraserStrokeWidthsArray } from "../tools/eraser";
import { StrokeWidthPicker } from "./shared/stroke-width-picker";

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
