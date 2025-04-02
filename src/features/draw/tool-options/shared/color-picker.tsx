import { useTools } from "../../tools-context";
import type { ToolColor } from "../../tools";
import type { ToolType } from "../../tools";

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
					<button
						key={color.name}
						type="button"
						className={`flex flex-1 p-1 aspect-square items-center justify-center rounded-lg ring-1  ${
							selectedColor.value === color.value
								? "ring-offset-1 ring-blue-500"
								: "ring-gray-200"
						}`}
						onClick={() => {
							editToolProperties(toolType, { color });
						}}
					>
						<div className="w-7 flex justify-center items-center">
							<div
								className="w-full aspect-square rounded-full"
								style={{ backgroundColor: color.value }}
							/>
						</div>
					</button>
				))}
			</div>
		</div>
	);
}
