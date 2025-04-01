import type { Tool } from "../tools";
import type { ToolStrokeWidth } from "../tools";
import type { ToolColor } from "../tools";

export const lineStrokeWidths = {
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
} satisfies Record<string, ToolStrokeWidth>;

export const lineStrokeWidthsArray = Object.values(lineStrokeWidths);

const lineColors = {
	black: {
		value: "#000000",
		tooltip: "Draw line in black",
		name: "Black",
	},
	red: {
		value: "#ff0000",
		name: "Red",
		tooltip: "Draw line in red",
	},
	green: {
		value: "#00ff00",
		name: "Green",
		tooltip: "Draw line in green",
	},
	blue: {
		value: "#0000ff",
		name: "Blue",
		tooltip: "Draw line in blue",
	},
	yellow: {
		value: "#ffff00",
		name: "Yellow",
		tooltip: "Draw line in yellow",
	},
} satisfies Record<string, ToolColor>;

export const lineColorsArray = Object.values(lineColors);

export const line = {
	type: "line" as const,
	name: "Line" as const,
	icon: "—" as const,
	tooltip: "Draw line" as const,
	properties: {
		stroke: lineStrokeWidths.regular,
		color: lineColors.black,
		active: false as boolean,
		startX: 0,
		startY: 0,
	},
} satisfies Tool;
