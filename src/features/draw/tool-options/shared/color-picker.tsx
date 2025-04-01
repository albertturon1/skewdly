import { useTools } from "../../tools-context";
import { Tooltip } from "../../tooltip";
import type { ToolColor } from "../../tools";
import type { ToolType } from "../../tools";

export interface ColorPickerProps {
	colors: ToolColor[];
	toolType: ToolType;
	selectedColor: ToolColor;
}

export function ColorPicker({
	colors,
	toolType,
	selectedColor,
}: ColorPickerProps) {
	const { editToolProperties } = useTools();

	return (
		<div className="flex flex-col gap-2 align-center">
			{colors.map((color) => (
				<Tooltip key={color.name} content={color.tooltip}>
					<div className="w-full flex items-center justify-center">
						<button
							type="button"
							className={`h-8 w-8 rounded-full self-center border ${
								selectedColor.value === color.value
									? "ring-2 ring-offset-2 ring-blue-500"
									: "border-gray-300"
							}`}
							style={{ backgroundColor: color.value }}
							onClick={() => {
								editToolProperties(toolType, { color });
							}}
						/>
					</div>
				</Tooltip>
			))}
		</div>
	);
}
