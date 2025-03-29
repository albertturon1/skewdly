import { HistoryControllers } from "./history-controllers";
import { ToolsControllers } from "./tools-controllers";

export function PrimaryToolbar() {
	return (
		<div className="p-2 border-b border-gray-200 flex items-center gap-2 bg-white/95 backdrop-blur-sm shadow-sm [&>*:not(:last-child)]:mr-4 [&>*:not(:last-child)]:border-r-[1px] [&>*:not(:last-child)]:border-gray-300">
			<ToolsControllers />
			<HistoryControllers />
		</div>
	);
}
