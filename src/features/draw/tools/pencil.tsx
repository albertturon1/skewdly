import type { Tool, ToolColor, ToolStrokeRecord } from "../tools";

export const pencilStrokeWidths: ToolStrokeRecord = {
	thin: {
		size: 3,
		tooltip: "Thin line",
	},
	regular: {
		size: 6,
		tooltip: "Regular line",
	},
	thick: {
		size: 12,
		tooltip: "Thick line",
	},
	huge: {
		size: 24,
		tooltip: "Huge line",
	},
};

export const pencilStrokeWidthsArray = Object.values(pencilStrokeWidths);

export const pencilColors = {
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
} satisfies Record<string, ToolColor>;

export const pencilColorsArray = Object.values(pencilColors);

export const pencil = {
	type: "pencil" as const,
	name: "Pencil" as const,
	icon: <img src="/pencil.svg" alt="Pencil" className="h-4 w-4" />,
	tooltip: "Free-hand drawing" as const,
	properties: {
		stroke: pencilStrokeWidths.regular,
		color: pencilColors.black,
		active: false as boolean,
	},
} satisfies Tool;
