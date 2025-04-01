import type { ReactElement } from "react";
import type { GenericTools } from "./tools-context";
import { eraser } from "./tools/eraser";
import { pencil } from "./tools/pencil";
import { rectangle } from "./tools/rectangle";
import { ellipse } from "./tools/ellipse";
import { arrow } from "./tools/arrow";
import { line } from "./tools/line";
import { diamond } from "./tools/diamond";

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

export type ToolStrokeName = "thin" | "regular" | "thick";
export type ToolStrokeRecord = Record<ToolStrokeName, ToolStrokeWidth>;

export type ToolColor = Readonly<{
	value: string;
	name: string;
	tooltip: string;
}>;

export const tools = {
	pencil,
	eraser,
	rectangle,
	ellipse,
	arrow,
	line,
	diamond,
	// select: {
	//   name: "Select",
	//   icon: "☐",
	//   type: "select",
	//   tooltip: "Select and move objects",
	// },
	// text: {
	//   name: "Text",
	//   icon: "T",
	//   type: "text",
	//   tooltip: "Add text",
	// },
} satisfies Record<string, Tool>;

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
