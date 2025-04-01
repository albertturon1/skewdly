import type { Tool, ToolStrokeRecord } from "../tools";
import type { ToolColor } from "../tools";

export const diamondStrokeWidths: ToolStrokeRecord = {
	thin: {
		size: 2,
		tooltip: "Thin diamond",
	},
	regular: {
		size: 4,
		tooltip: "Regular diamond",
	},
	thick: {
		size: 8,
		tooltip: "Thick diamond",
	},
};

export const diamondStrokeWidthsArray = Object.values(diamondStrokeWidths);

const diamondColors = {
	black: {
		value: "#000000",
		tooltip: "Draw diamond in black",
		name: "Black",
	},
	red: {
		value: "#ff0000",
		name: "Red",
		tooltip: "Draw diamond in red",
	},
	green: {
		value: "#00ff00",
		name: "Green",
		tooltip: "Draw diamond in green",
	},
	blue: {
		value: "#0000ff",
		name: "Blue",
		tooltip: "Draw diamond in blue",
	},
	yellow: {
		value: "#ffff00",
		name: "Yellow",
		tooltip: "Draw diamond in yellow",
	},
} satisfies Record<string, ToolColor>;

export const diamondColorsArray = Object.values(diamondColors);

export const diamond = {
	type: "diamond" as const,
	name: "Diamond" as const,
	icon: "◇" as const,
	tooltip: "Draw diamond" as const,
	properties: {
		stroke: diamondStrokeWidths.regular,
		color: diamondColors.black,
		active: false as boolean,
		startX: 0,
		startY: 0,
	},
} satisfies Tool;
