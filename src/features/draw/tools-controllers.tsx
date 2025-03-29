import { useDrawing } from "./drawing-context";
import { tools } from "./tools";
import { Tooltip } from "./tooltip";

export function ToolsControllers() {
	const { activeTool, setActiveTool } = useDrawing();

	return (
		<div className="border border-gray-200 rounded-md overflow-hidden flex">
			{Object.values(tools).map((t) => {
				return (
					<Tooltip key={t.name} content={t.tooltip}>
						<button
							type="button"
							className={`p-2 h-10 w-10 flex items-center justify-center text-lg hover:bg-gray-100 ${
								activeTool === t.type ? "bg-gray-100" : ""
							}`}
							onClick={() => {
								setActiveTool(t.type);
							}}
						>
							{t.icon}
						</button>
					</Tooltip>
				);
			})}
		</div>
	);
}
