import { useTools } from "@/features/draw/tools-context";
import type { ToolStrokeWidth } from "@/features/draw/tools";
import type { ToolType } from "@/features/draw/tools";
import { ToolOptionButton } from "@/features/draw/tool-options/shared/tool-option-button";

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
