import type { Tool } from "../tools";
import type { ToolStrokeWidth } from "../tools";
import type { ToolColor } from "../tools";

export const arrowStrokeWidths = {
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
} satisfies Record<string, ToolStrokeWidth>;

export const arrowStrokeWidthsArray = Object.values(arrowStrokeWidths);

const arrowColors = {
	black: {
		value: "#000000",
		tooltip: "Draw arrow in black",
		name: "Black",
	},
	red: {
		value: "#ff0000",
		name: "Red",
		tooltip: "Draw arrow in red",
	},
	green: {
		value: "#00ff00",
		name: "Green",
		tooltip: "Draw arrow in green",
	},
	blue: {
		value: "#0000ff",
		name: "Blue",
		tooltip: "Draw arrow in blue",
	},
	yellow: {
		value: "#ffff00",
		name: "Yellow",
		tooltip: "Draw arrow in yellow",
	},
} satisfies Record<string, ToolColor>;

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
