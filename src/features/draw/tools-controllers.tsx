import { useTools } from "./tools-context";
import { tools } from "./tools";

export function ToolsControllers() {
	const { activeTool, setActiveTool } = useTools();

	return (
		<div className="border border-gray-200 rounded-md overflow-hidden flex">
			{Object.values(tools).map((t) => {
				return (
					<button
						key={t.name}
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
				);
			})}
		</div>
	);
}
