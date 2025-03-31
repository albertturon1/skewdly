import type { Tool, ToolColor, ToolStrokeWidth } from "../tools";

const strokeWidths: Record<string, ToolStrokeWidth> = {
	veryThin: {
		width: 4,
		tooltip: "Very thin line (1px)",
	},
	thin: {
		width: 8,
		tooltip: "Thin line (2px)",
	},
	medium: {
		width: 16,
		tooltip: "Medium line (4px)",
	},
	thick: {
		width: 32,
		tooltip: "Thick line (6px)",
	},
};

export const pencilStrokeWidthsArray = Object.values(strokeWidths);

const pencilColors = {
	black: {
		value: "#000000",
		tooltip: "Draw in black",
		name: "Black",
	} as const,
	red: {
		value: "#ff0000",
		name: "Red",
		tooltip: "Draw in red",
	} as const,
	green: {
		value: "#00ff00",
		name: "Green",
		tooltip: "Draw in green",
	} as const,
	blue: {
		value: "#0000ff",
		name: "Blue",
		tooltip: "Draw in blue",
	} as const,
	yellow: {
		value: "#ffff00",
		name: "Yellow",
		tooltip: "Draw in yellow",
	} as const,
} satisfies Record<string, ToolColor>;

export const pencilColorsArray = Object.values(pencilColors);

export const pencil = {
	type: "pencil" as const,
	name: "Pencil" as const,
	icon: "✎" as const,
	tooltip: "Free-hand drawing" as const,
	properties: {
		stroke: strokeWidths.thick,
		color: pencilColors.black as ToolColor,
		active: false as boolean,
	},
} satisfies Tool;
