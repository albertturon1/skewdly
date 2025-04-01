import { useTools } from "../../tools-context";
import { Tooltip } from "../../tooltip";
import type { ToolStrokeWidth } from "../../tools";
import type { ToolType } from "../../tools";

export interface StrokeWidthPickerProps {
	strokes: ToolStrokeWidth[];
	toolType: ToolType;
	selectedStroke: ToolStrokeWidth;
	variant?: "line" | "dot";
	label?: string;
}

export function StrokeWidthPicker({
	strokes,
	toolType,
	selectedStroke,
	variant = "line",
	label = "Stroke width",
}: StrokeWidthPickerProps) {
	const { editToolProperties } = useTools();

	return (
		<div className="flex flex-col gap-2">
			<span className="text-xs font-medium text-gray-900">{label}</span>
			<div className="flex gap-1.5 items-stretch">
				{strokes.map((stroke) => (
					<Tooltip key={stroke.size} content={stroke.tooltip}>
						<button
							type="button"
							className={`flex flex-1 p-1 aspect-square items-center justify-center rounded-lg bg-gray-100 hover:bg-slate-350 ${
								selectedStroke.size === stroke.size ? "bg-slate-300" : ""
							}`}
							onClick={() => {
								editToolProperties(toolType, { stroke });
							}}
						>
							<div className="w-7 flex justify-center items-center">
								{variant === "dot" ? (
									<div
										className=" bg-black rounded-full aspect-square"
										style={{
											height: `${stroke.size}px`,
										}}
									/>
								) : (
									<div
										className="bg-black rounded-sm aspect-square"
										style={{
											height: `${stroke.size}px`,
										}}
									/>
								)}
							</div>
						</button>
					</Tooltip>
				))}
			</div>
		</div>
	);
}
