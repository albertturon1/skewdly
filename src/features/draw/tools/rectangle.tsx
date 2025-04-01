import type { Tool } from "../tools";
import type { ToolStrokeWidth } from "../tools";
import type { ToolColor } from "../tools";

export const rectangleStrokeWidths = {
	thin: {
		size: 2,
		tooltip: "Thin rectangle border",
	},
	regular: {
		size: 4,
		tooltip: "Regular rectangle border",
	},
	thick: {
		size: 8,
		tooltip: "Thick rectangle border",
	},
} satisfies Record<string, ToolStrokeWidth>;

export const rectangleStrokeWidthsArray = Object.values(rectangleStrokeWidths);

const rectangleColors = {
	black: {
		value: "#000000",
		tooltip: "Draw rectangle in black",
		name: "Black",
	},
	red: {
		value: "#ff0000",
		name: "Red",
		tooltip: "Draw rectangle in red",
	},
	green: {
		value: "#00ff00",
		name: "Green",
		tooltip: "Draw rectangle in green",
	},
	blue: {
		value: "#0000ff",
		name: "Blue",
		tooltip: "Draw rectangle in blue",
	},
	yellow: {
		value: "#ffff00",
		name: "Yellow",
		tooltip: "Draw rectangle in yellow",
	},
} satisfies Record<string, ToolColor>;

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
	} satisfies RectangleProperties,
} satisfies Tool;
