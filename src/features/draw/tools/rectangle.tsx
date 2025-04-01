import type { Tool, ToolStrokeRecord } from "../tools";
import type { ToolStrokeWidth } from "../tools";
import type { ToolColor } from "../tools";
import { pencilColors } from "./pencil";

export const rectangleStrokeWidths: ToolStrokeRecord = {
	thin: {
		size: 2,
		tooltip: "Thin rectangle",
	},
	regular: {
		size: 4,
		tooltip: "Regular rectangle",
	},
	thick: {
		size: 8,
		tooltip: "Thick rectangle",
	},
	huge: {
		size: 24,
		tooltip: "Huge rectangle",
	},
} satisfies Record<string, ToolStrokeWidth>;

export const rectangleStrokeWidthsArray = Object.values(rectangleStrokeWidths);

const rectangleColors = pencilColors satisfies Record<string, ToolColor>;

export const rectangleColorsArray = Object.values(rectangleColors);

export interface RectangleProperties {
	stroke: ToolStrokeWidth;
	color: ToolColor;
	active: boolean;
	startX: number;
	startY: number;
}

export const rectangle = {
	type: "rectangle" as const,
	name: "Rectangle" as const,
	icon: "□" as const,
	tooltip: "Draw rectangle" as const,
	properties: {
		stroke: rectangleStrokeWidths.regular,
		color: rectangleColors.black,
		active: false as boolean,
		startX: 0,
		startY: 0,
	},
} satisfies Tool;
