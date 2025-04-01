import type { Tool, ToolStrokeRecord } from "../tools";
import type { ToolColor } from "../tools";
import { pencilColors } from "./pencil";

export const arrowStrokeWidths: ToolStrokeRecord = {
	thin: {
		size: 2,
		tooltip: "Thin arrow",
	},
	regular: {
		size: 4,
		tooltip: "Regular arrow",
	},
	thick: {
		size: 8,
		tooltip: "Thick arrow",
	},
	huge: {
		size: 24,
		tooltip: "Huge arrow",
	},
};

export const arrowStrokeWidthsArray = Object.values(arrowStrokeWidths);

const arrowColors = pencilColors satisfies Record<string, ToolColor>;

export const arrowColorsArray = Object.values(arrowColors);

export const arrow = {
	type: "arrow" as const,
	name: "Arrow" as const,
	icon: "→" as const,
	tooltip: "Draw arrow" as const,
	properties: {
		stroke: arrowStrokeWidths.regular,
		color: arrowColors.black,
		active: false as boolean,
		startX: 0,
		startY: 0,
	},
} satisfies Tool;
