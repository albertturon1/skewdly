export interface Tool {
	readonly name: string;
	readonly icon: string;
	readonly type: string;
	readonly tooltip: string;
}

export const tools = {
	pencil: {
		name: "Pencil",
		icon: "✎",
		type: "pencil",
		tooltip: "Free-hand drawing",
	},
	// select: {
	//   name: "Select",
	//   icon: "☐",
	//   type: "select",
	//   tooltip: "Select and move objects",
	// },
	// rectangle: {
	//   name: "Rectangle",
	//   icon: "□",
	//   type: "rectangle",
	//   tooltip: "Draw rectangle",
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
	// eraser: {
	//   name: "Eraser",
	//   icon: "⌫",
	//   type: "eraser",
	//   tooltip: "Erase parts of drawing",
	// },
} as const;

// If you need the array version, you can create it from the object:
export const toolsArray = Object.values(tools) as Tool[];

// Type for the tool names
export type ToolName = keyof typeof tools;

// Type for the tool types
export type ToolType = (typeof tools)[ToolName]["type"];
