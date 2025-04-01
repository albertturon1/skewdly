import { createFileRoute } from "@tanstack/react-router";
import { ToolsProvider } from "../features/draw/tools-context";
import { PrimaryToolbar } from "../features/draw/primary-toolbar";
import { ToolOptions } from "../features/draw/tool-options";
import { toolsInitialState } from "../features/draw/tools";
import { Canvas } from "../features/draw/canvas";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<ToolsProvider tools={toolsInitialState}>
			<div className="w-dvw h-dvh flex flex-col bg-white overflow-hidden relative">
				<div className="absolute top-0 left-0 right-0 z-10">
					<PrimaryToolbar />
				</div>
				<div className="absolute top-[59px] left-0 z-10">
					<ToolOptions />
				</div>
				<div className="absolute inset-0">
					<Canvas />
				</div>
			</div>
		</ToolsProvider>
	);
}
