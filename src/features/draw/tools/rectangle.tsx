import type { Tool, ToolStrokeRecord } from "@/features/draw/tools";
import type { ToolStrokeWidth } from "@/features/draw/tools";
import type { ToolColor } from "@/features/draw/tools";
import { pencilColors } from "@/features/draw/tools/pencil";

export const rectangleStrokeWidths: ToolStrokeRecord = {
	thin: {
		size: 3,
		tooltip: "Thin rectangle",
	},
	regular: {
		size: 6,
		tooltip: "Regular rectangle",
	},
	thick: {
		size: 12,
		tooltip: "Thick rectangle",
	},
	huge: {
		size: 22,
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
	icon: <img src="/rectangle.svg" alt="Rectangle" className="h-4 w-4" />,

	tooltip: "Draw rectangle" as const,
	properties: {
		stroke: rectangleStrokeWidths.regular,
		color: rectangleColors.black,
		active: false as boolean,
		startX: 0,
		startY: 0,
	},
} satisfies Tool;
