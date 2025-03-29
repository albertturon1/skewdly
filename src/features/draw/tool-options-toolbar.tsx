import { useDrawing } from "./drawing-context";
import { tools } from "./tools";
import { Tooltip } from "./tooltip";

const colors = [
	{ name: "Black", value: "#000000", tooltip: "Draw in black" },
	{ name: "Red", value: "#ff0000", tooltip: "Draw in red" },
	{ name: "Green", value: "#00ff00", tooltip: "Draw in green" },
	{ name: "Blue", value: "#0000ff", tooltip: "Draw in blue" },
	{ name: "Yellow", value: "#ffff00", tooltip: "Draw in yellow" },
];

const strokeWidths = [
	{ width: 1, tooltip: "Very thin line (1px)" },
	{ width: 2, tooltip: "Thin line (2px)" },
	{ width: 4, tooltip: "Medium line (4px)" },
	{ width: 6, tooltip: "Thick line (6px)" },
];

export function ToolOptionsToolbar() {
	const { tool, color, setColor, strokeWidth, setStrokeWidth } = useDrawing();

	const showColorOptions = tool.type === tools.pencil.type;
	const showStrokeWidthOptions = tool.type === tools.pencil.type;

	return (
		<div className="p-2 border-r border-gray-200 flex flex-col gap-4 bg-white [&>*:not(:last-child)]:pb-2 [&>*:not(:last-child)]:border-b-[1px] [&>*:not(:last-child)]:border-gray-300">
			{/* --- Color Section --- */}
			{showColorOptions && (
				<div className="flex flex-col gap-2">
					{colors.map((c) => (
						<Tooltip key={c.name} content={c.tooltip}>
							<button
								type="button"
								className={`h-8 w-8 rounded-full border ${
									color === c.value
										? "ring-2 ring-offset-2 ring-blue-500"
										: "border-gray-300"
								}`}
								style={{ backgroundColor: c.value }}
								onClick={() => setColor(c.value)}
							/>
						</Tooltip>
					))}
				</div>
			)}

			{/* --- Stroke Width Section --- */}
			{showStrokeWidthOptions && (
				<div className="flex flex-col gap-1">
					{strokeWidths.map((sw) => (
						<Tooltip key={sw.width} content={sw.tooltip}>
							<button
								type="button"
								className={`h-8 w-full flex items-center justify-center px-2 rounded hover:bg-gray-100 ${
									strokeWidth === sw.width ? "bg-gray-100" : ""
								}`}
								onClick={() => setStrokeWidth(sw.width)}
							>
								<div
									className={"bg-black rounded-full"}
									style={{
										height: `${sw.width}px`,
										width: `${sw.width * 3}px`,
									}}
								/>
							</button>
						</Tooltip>
					))}
				</div>
			)}
		</div>
	);
}
