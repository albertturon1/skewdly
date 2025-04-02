import { useTools } from "../../tools-context";
import type { ToolStrokeWidth } from "../../tools";
import type { ToolType } from "../../tools";
import { ToolOptionButton } from "./tool-option-button";

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
					<ToolOptionButton
						key={stroke.size}
						isSelected={selectedStroke.size === stroke.size}
						onClick={() => {
							editToolProperties(toolType, { stroke });
						}}
					>
						{variant === "dot" ? (
							<div
								className="bg-black rounded-full aspect-square"
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
					</ToolOptionButton>
				))}
			</div>
		</div>
	);
}
