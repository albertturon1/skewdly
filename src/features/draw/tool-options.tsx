import { useTools } from "./tools-context";
import { EraserOptions } from "./tool-options/eraser-options";
import { PencilOptions } from "./tool-options/pencil-options";
import { RectangleOptions } from "./tool-options/rectangle-options";
import { EllipseOptions } from "./tool-options/ellipse-options";
import { toolTypes } from "./tools";

export function ToolOptions() {
	const { activeTool } = useTools();

	switch (activeTool) {
		case toolTypes.pencil: {
			return (
				<ToolOptionsComponentWrapper>
					<PencilOptions />
				</ToolOptionsComponentWrapper>
			);
		}
		case toolTypes.eraser: {
			return (
				<ToolOptionsComponentWrapper>
					<EraserOptions />
				</ToolOptionsComponentWrapper>
			);
		}
		case toolTypes.rectangle: {
			return (
				<ToolOptionsComponentWrapper>
					<RectangleOptions />
				</ToolOptionsComponentWrapper>
			);
		}
		case toolTypes.ellipse: {
			return (
				<ToolOptionsComponentWrapper>
					<EllipseOptions />
				</ToolOptionsComponentWrapper>
			);
		}
		default: {
			return null;
		}
	}
}

function ToolOptionsComponentWrapper({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="p-2 border-r border-gray-200 flex flex-col gap-4 bg-white/95 backdrop-blur-sm shadow-sm">
			{children}
		</div>
	);
}
