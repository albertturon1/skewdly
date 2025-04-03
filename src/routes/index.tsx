import { createFileRoute } from "@tanstack/react-router";
import { ToolsProvider } from "@/features/draw/tools-context";
import { Toolbars } from "@/features/draw/toolbars/toolbars";
import { toolsInitialState } from "@/features/draw/tools";
import { Canvas } from "@/features/draw/canvas";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<ToolsProvider tools={toolsInitialState}>
			<div className="w-dvw h-dvh flex flex-col bg-white overflow-hidden relative">
				<Toolbars />
				<div className="absolute inset-0">
					<Canvas />
				</div>
			</div>
		</ToolsProvider>
	);
}
