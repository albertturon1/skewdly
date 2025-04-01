import type { Tool } from "../tools";
import type { ToolStrokeWidth } from "../tools";
import type { ToolColor } from "../tools";

export const ellipseStrokeWidths = {
	thin: {
		size: 2,
		tooltip: "Thin ellipse border",
	},
	regular: {
		size: 4,
		tooltip: "Regular ellipse border",
	},
	thick: {
		size: 8,
		tooltip: "Thick ellipse border",
	},
} satisfies Record<string, ToolStrokeWidth>;

export const ellipseStrokeWidthsArray = Object.values(ellipseStrokeWidths);

const ellipseColors = {
	black: {
		value: "#000000",
		tooltip: "Draw ellipse in black",
		name: "Black",
	},
	red: {
		value: "#ff0000",
		name: "Red",
		tooltip: "Draw ellipse in red",
	},
	green: {
		value: "#00ff00",
		name: "Green",
		tooltip: "Draw ellipse in green",
	},
	blue: {
		value: "#0000ff",
		name: "Blue",
		tooltip: "Draw ellipse in blue",
	},
	yellow: {
		value: "#ffff00",
		name: "Yellow",
		tooltip: "Draw ellipse in yellow",
	},
} satisfies Record<string, ToolColor>;

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
