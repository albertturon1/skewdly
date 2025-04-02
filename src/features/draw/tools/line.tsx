import type { Tool, ToolStrokeRecord } from "../tools";
import type { ToolColor } from "../tools";
import { pencilColors } from "./pencil";

export const lineStrokeWidths: ToolStrokeRecord = {
	thin: {
		size: 2,
		tooltip: "Thin line",
	},
	regular: {
		size: 4,
		tooltip: "Regular line",
	},
	thick: {
		size: 8,
		tooltip: "Thick line",
	},
	huge: {
		size: 24,
		tooltip: "Huge line",
	},
};

export const lineStrokeWidthsArray = Object.values(lineStrokeWidths);

const lineColors = pencilColors satisfies Record<string, ToolColor>;

export const lineColorsArray = Object.values(lineColors);

export const line = {
	type: "line" as const,
	name: "Line" as const,
	icon: <img src="/horizontal-line.svg" alt="Line" className="h-4.5 w-4.5" />,
	tooltip: "Draw line" as const,
	properties: {
		stroke: lineStrokeWidths.regular,
		color: lineColors.black,
		active: false as boolean,
		startX: 0,
		startY: 0,
	},
} satisfies Tool;
