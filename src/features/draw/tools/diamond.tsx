import type { Tool, ToolStrokeRecord } from "../tools";
import type { ToolColor } from "../tools";
import { pencilColors } from "./pencil";

export const diamondStrokeWidths: ToolStrokeRecord = {
	thin: {
		size: 3,
		tooltip: "Thin diamond",
	},
	regular: {
		size: 6,
		tooltip: "Regular diamond",
	},
	thick: {
		size: 12,
		tooltip: "Thick diamond",
	},
	huge: {
		size: 24,
		tooltip: "Huge diamond",
	},
};

export const diamondStrokeWidthsArray = Object.values(diamondStrokeWidths);

const diamondColors = pencilColors satisfies Record<string, ToolColor>;

export const diamondColorsArray = Object.values(diamondColors);

export const diamond = {
	type: "diamond" as const,
	name: "Diamond" as const,
	icon: <img src="/diamond.svg" alt="Diamond" className="h-3.5 w-3.5" />,
	tooltip: "Draw diamond" as const,
	properties: {
		stroke: diamondStrokeWidths.regular,
		color: diamondColors.black,
		active: false as boolean,
		startX: 0,
		startY: 0,
	},
} satisfies Tool;
