import { useTools } from "@/features/draw/tools-context";
import { tools } from "@/features/draw/tools";
import { ToolbarButton } from "@/features/draw/toolbars/toolbar-button";

export function ToolsControllers() {
	const { activeTool, setActiveTool } = useTools();

	return (
		<div className="flex gap-x-1">
			{Object.values(tools).map((t) => {
				return (
					<ToolbarButton
						key={t.name}
						containerClass={`${activeTool === t.type ? "bg-slate-200" : ""}`}
						onClick={() => {
							setActiveTool(t.type);
						}}
					>
						{t.icon}
					</ToolbarButton>
				);
			})}
		</div>
	);
}
