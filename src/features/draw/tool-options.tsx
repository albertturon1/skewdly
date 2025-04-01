import { useTools } from "./tools-context";
import { EraserOptions } from "./tool-options/eraser-options";
import { PencilOptions } from "./tool-options/pencil-options";
import { RectangleOptions } from "./tool-options/rectangle-options";
import { EllipseOptions } from "./tool-options/ellipse-options";
import { ArrowOptions } from "./tool-options/arrow-options";
import { LineOptions } from "./tool-options/line-options";
import { DiamondOptions } from "./tool-options/diamond-options";
import { toolTypes } from "./tools";
import type { ToolType } from "./tools";
import type { ReactElement } from "react";

const TOOL_COMPONENTS: Record<ToolType, () => ReactElement> = {
	[toolTypes.pencil]: PencilOptions,
	[toolTypes.eraser]: EraserOptions,
	[toolTypes.rectangle]: RectangleOptions,
	[toolTypes.ellipse]: EllipseOptions,
	[toolTypes.arrow]: ArrowOptions,
	[toolTypes.line]: LineOptions,
	[toolTypes.diamond]: DiamondOptions,
} as const;

export function ToolOptions() {
	const { activeTool } = useTools();
	const ToolComponent = TOOL_COMPONENTS[activeTool];

	return (
		<div className="px-3.5 py-4 border-r border-gray-200 flex flex-col gap-y-5 bg-white/95 backdrop-blur-sm shadow-sm w-full rounded">
			<ToolComponent />
		</div>
	);
}
