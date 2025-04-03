import type { ReactElement, ReactNode, RefCallback } from "react";
import { useCallback, useState } from "react";
import { HistoryControllers } from "@/features/draw/toolbars/history-controllers";
import { ToolsControllers } from "@/features/draw/toolbars/tools-controllers";
import { SessionShareDialog } from "@/features/draw/toolbars/session-share-dialog";
import { EllipseOptions } from "@/features/draw/tool-options/ellipse-options";
import { EraserOptions } from "@/features/draw/tool-options/eraser-options";
import { PencilOptions } from "@/features/draw/tool-options/pencil-options";
import { RectangleOptions } from "@/features/draw/tool-options/rectangle-options";
import { ArrowOptions } from "@/features/draw/tool-options/arrow-options";
import { LineOptions } from "@/features/draw/tool-options/line-options";
import { DiamondOptions } from "@/features/draw/tool-options/diamond-options";
import { toolTypes } from "@/features/draw/tools";
import type { ToolType } from "@/features/draw/tools";
import { useTools } from "@/features/draw/tools-context";
import { cn } from "@/lib/utils";

const TOOL_COMPONENTS: Record<ToolType, () => ReactElement> = {
	[toolTypes.pencil]: PencilOptions,
	[toolTypes.eraser]: EraserOptions,
	[toolTypes.rectangle]: RectangleOptions,
	[toolTypes.ellipse]: EllipseOptions,
	[toolTypes.arrow]: ArrowOptions,
	[toolTypes.line]: LineOptions,
	[toolTypes.diamond]: DiamondOptions,
} as const;

export function Toolbars() {
	const { activeTool } = useTools();
	const ToolComponent = TOOL_COMPONENTS[activeTool];
	const [toolbarBottom, setToolbarBottom] = useState(0);

	const handleToolbarRef = useCallback((node: HTMLDivElement | null) => {
		if (node) {
			const updatePosition = () => {
				const rect = node.getBoundingClientRect();
				setToolbarBottom(rect.bottom);
			};

			// Initial measurement
			updatePosition();

			// Update on resize
			window.addEventListener("resize", updatePosition);
			return () => window.removeEventListener("resize", updatePosition);
		}
	}, []);

	return (
		<>
			<ToolbarContainer
				className="top-2.5 left-1/2 -translate-x-1/2 border-b items-center gap-x-6 px-3 py-2"
				ref={handleToolbarRef}
			>
				<ToolsControllers />
				<HistoryControllers />
				<SessionShareDialog />
			</ToolbarContainer>
			<ToolbarContainer
				className="left-2.5 flex-col gap-y-5 p-4 border-r"
				style={{ top: `${toolbarBottom + 10}px` }}
			>
				<ToolComponent />
			</ToolbarContainer>
		</>
	);
}

interface ToolbarContainerProps {
	children: ReactNode;
	className?: string;
	ref?: RefCallback<HTMLDivElement>;
	style?: React.CSSProperties;
}

function ToolbarContainer({
	children,
	className,
	...props
}: ToolbarContainerProps) {
	return (
		<div
			{...props}
			className={cn(
				"bg-white/65 backdrop-blur-sm shadow-sm border-gray-200 rounded-lg select-none z-10 flex fixed",
				className,
			)}
		>
			{children}
		</div>
	);
}
