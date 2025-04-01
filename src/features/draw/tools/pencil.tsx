import type { Tool, ToolColor, ToolStrokeWidth } from "../tools";

export const pencilStrokeWidths = {
	extraFine: {
		size: 4,
		tooltip: "Thin line",
	},
	fine: {
		size: 8,
		tooltip: "Small line",
	},
	regular: {
		size: 16,
		tooltip: "Medium line",
	},
	bold: {
		size: 32,
		tooltip: "Thick line",
	},
} satisfies Record<string, ToolStrokeWidth>;

export const pencilStrokeWidthsArray = Object.values(pencilStrokeWidths);

const pencilColors = {
	black: {
		value: "#000000",
		tooltip: "Draw in black",
		name: "Black",
	},
	red: {
		value: "#ff0000",
		name: "Red",
		tooltip: "Draw in red",
	},
	green: {
		value: "#00ff00",
		name: "Green",
		tooltip: "Draw in green",
	},
	blue: {
		value: "#0000ff",
		name: "Blue",
		tooltip: "Draw in blue",
	},
	yellow: {
		value: "#ffff00",
		name: "Yellow",
		tooltip: "Draw in yellow",
	},
} satisfies Record<string, ToolColor>;

export const pencilColorsArray = Object.values(pencilColors);

export const pencil = {
	type: "pencil" as const,
	name: "Pencil" as const,
	icon: "✎" as const,
	tooltip: "Free-hand drawing" as const,
	properties: {
		stroke: pencilStrokeWidths.regular,
		color: pencilColors.black,
		active: false as boolean,
	},
} satisfies Tool;
