import { useTools } from "@/features/draw/tools-context";
import type { ToolColor } from "@/features/draw/tools";
import type { ToolType } from "@/features/draw/tools";
import { ToolOptionButton } from "@/features/draw/tool-options/shared/tool-option-button";

export interface ColorPickerProps {
	colors: ToolColor[];
	toolType: ToolType;
	selectedColor: ToolColor;
	label?: string;
}

export function ColorPicker({
	colors,
	toolType,
	selectedColor,
	label = "Color",
}: ColorPickerProps) {
	const { editToolProperties } = useTools();

	return (
		<div className="flex flex-col gap-2">
			<span className="text-xs font-medium text-gray-900">{label}</span>
			<div className="flex gap-1.5 items-stretch">
				{colors.map((color) => (
					<ToolOptionButton
						key={color.name}
						isSelected={selectedColor.value === color.value}
						onClick={() => {
							editToolProperties(toolType, { color });
						}}
					>
						<div
							className="w-full aspect-square rounded-full"
							style={{ backgroundColor: color.value }}
						/>
					</ToolOptionButton>
				))}
			</div>
		</div>
	);
}
