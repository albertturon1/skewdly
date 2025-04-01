import type { ReactElement } from "react";
import type { GenericTools } from "./tools-context";
import { eraser } from "./tools/eraser";
import { pencil } from "./tools/pencil";
import { rectangle } from "./tools/rectangle";

export interface Tool {
	name: string;
	icon: string | ReactElement;
	type: string;
	tooltip: string;
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	properties?: Record<string, string | number | boolean | {}>;
}

export interface ToolStrokeWidth {
	size: number;
	tooltip: string;
}

export type ToolColor = Readonly<{
	value: string;
	name: string;
	tooltip: string;
}>;

export const tools = {
	pencil,
	eraser,
	rectangle,
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
