import type { GenericTools } from "./drawing-context";

export type Color = {
	name: string;
	value: string;
	tooltip: string;
};

export type StrokeWidth = {
	width: number;
	tooltip: string;
};

export const pencilColors = {
	black: {
		name: "Black",
		value: "#000000",
		tooltip: "Draw in black",
	},
	red: {
		name: "Red",
		value: "#ff0000",
		tooltip: "Draw in red",
	},
	green: {
		name: "Green",
		value: "#00ff00",
		tooltip: "Draw in green",
	},
	blue: {
		name: "Blue",
		value: "#0000ff",
		tooltip: "Draw in blue",
	},
	yellow: {
		name: "Yellow",
		value: "#ffff00",
		tooltip: "Draw in yellow",
	},
} satisfies Record<string, Color>;
export const pencilColorsArray = Object.values(pencilColors) as Color[];

export const eraserStrokeWidths = {
	light: {
		width: 1,
		tooltip: "Light line (1px)",
	},
	veryThin: {
		width: 2,
		tooltip: "Very thin line (2px)",
	},
	thin: {
		width: 4,
		tooltip: "Thin line (2px)",
	},
	medium: {
		width: 8,
		tooltip: "Medium line (4px)",
	},
	thick: {
		width: 12,
		tooltip: "Thick line (12px)",
	},
} satisfies Record<string, StrokeWidth>;
export const eraserStrokeWidthsArray = Object.values(
	eraserStrokeWidths,
) as StrokeWidth[];

export const strokeWidths = {
	veryThin: {
		width: 1,
		tooltip: "Very thin line (1px)",
	},
	thin: {
		width: 2,
		tooltip: "Thin line (2px)",
	},
	medium: {
		width: 4,
		tooltip: "Medium line (4px)",
	},
	thick: {
		width: 6,
		tooltip: "Thick line (6px)",
	},
} satisfies Record<string, StrokeWidth>;
export const strokeWidthsArray = Object.values(strokeWidths) as StrokeWidth[];
export type StrokeWidthName = keyof typeof strokeWidths;

export interface Tool {
	name: string;
	icon: string;
	type: string;
	tooltip: string;
	properties?: Record<string, string | number | boolean>;
}

// const createTools = <T extends Record<string, Tool>>(tools: T) =>
// 	tools as {
// 		[K in keyof T]: Omit<T[K], "properties"> & {
// 			properties: {
// 				[P in keyof T[K]["properties"]]: T[K]["properties"][P] extends boolean
// 					? boolean
// 					: T[K]["properties"][P];
// 			};
// 		};
// 	};

export const tools = {
	pencil: {
		type: "pencil" as const,
		name: "Pencil",
		icon: "✎",
		tooltip: "Free-hand drawing",
		properties: {
			strokeWidth: strokeWidths.thick.width,
			color: "#000000",
			active: false as boolean,
		},
	},
	eraser: {
		type: "eraser" as const,
		name: "Eraser",
		icon: "🧹",
		tooltip: "Erase parts of drawing",
		properties: {
			strokeWidth: eraserStrokeWidths.thick.width,
			active: false as boolean,
		},
	},
	// rectangle: {
	// 	type: "rectangle" as const,
	// 	name: "Rectangle",
	// 	icon: "□",
	// 	tooltip: "Draw rectangle",
	// 	properties: {
	// 		strokeWidth: strokeWidths.thick.width,
	// 		color: "#000000",
	// 		active: false as boolean,
	// 	},
	// },
	// select: {
	//   name: "Select",
	//   icon: "☐",
	//   type: "select",
	//   tooltip: "Select and move objects",
	// },
	// diamond: {
	//   name: "Diamond",
	//   icon: "◇",
	//   type: "diamond",
	//   tooltip: "Draw diamond shape",
	// },
	// ellipse: {
	//   name: "Ellipse",
	//   icon: "○",
	//   type: "ellipse",
	//   tooltip: "Draw circle or ellipse",
	// },
	// arrow: {
	//   name: "Arrow",
	//   icon: "→",
	//   type: "arrow",
	//   tooltip: "Draw arrow",
	// },
	// line: {
	//   name: "Line",
	//   icon: "—",
	//   type: "line",
	//   tooltip: "Draw straight line",
	// },
	// text: {
	//   name: "Text",
	//   icon: "T",
	//   type: "text",
	//   tooltip: "Add text",
	// },
};

export const toolTypes = Object.fromEntries(
	Object.entries(tools).map(([key, tool]) => [key, tool.type]),
) as {
	[K in keyof typeof tools]: (typeof tools)[K]["type"];
};

// Type for the tool types
export type ToolType = (typeof tools)[keyof typeof tools]["type"];

export const toolsInitialState = {
	activeTool: tools.pencil.type as ToolType,
	tools,
} satisfies GenericTools;
