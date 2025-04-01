import type { Tool, ToolColor, ToolStrokeRecord } from "../tools";
import { pencilColors } from "./pencil";

export const ellipseStrokeWidths: ToolStrokeRecord = {
	thin: {
		size: 2,
		tooltip: "Thin ellipse",
	},
	regular: {
		size: 4,
		tooltip: "Regular ellipse",
	},
	thick: {
		size: 8,
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
	icon: "○" as const,
	tooltip: "Draw circle or ellipse" as const,
	properties: {
		stroke: ellipseStrokeWidths.regular,
		color: ellipseColors.black,
		active: false as boolean,
		startX: 0,
		startY: 0,
	},
} satisfies Tool;
