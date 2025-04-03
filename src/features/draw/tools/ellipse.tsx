import type { Tool, ToolColor, ToolStrokeRecord } from "@/features/draw/tools";
import { pencilColors } from "@/features/draw/tools/pencil";

export const ellipseStrokeWidths: ToolStrokeRecord = {
	thin: {
		size: 3,
		tooltip: "Thin ellipse",
	},
	regular: {
		size: 6,
		tooltip: "Regular ellipse",
	},
	thick: {
		size: 12,
		tooltip: "Thick ellipse",
	},
	huge: {
		size: 24,
		tooltip: "Huge ellipse",
	},
};

export const ellipseStrokeWidthsArray = Object.values(ellipseStrokeWidths);

const ellipseColors = pencilColors satisfies Record<string, ToolColor>;

export const ellipseColorsArray = Object.values(ellipseColors);

export const ellipse = {
	type: "ellipse" as const,
	name: "Ellipse" as const,
	icon: <img src="/circle.svg" alt="Ellipse" className="h-4 w-4" />,
	tooltip: "Draw circle or ellipse" as const,
	properties: {
		stroke: ellipseStrokeWidths.regular,
		color: ellipseColors.black,
		active: false as boolean,
		startX: 0,
		startY: 0,
	},
} satisfies Tool;
