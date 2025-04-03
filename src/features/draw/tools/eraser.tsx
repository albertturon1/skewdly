import type { Tool, ToolStrokeWidth } from "@/features/draw/tools";
import { pencilStrokeWidths } from "@/features/draw/tools/pencil";

export const EraserCursor = (size: number) => {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 330 330">
	  <path d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.982,0,165,0z M165,300
	  C90.561,300,30,239.44,30,165S90.561,30,165,30c74.439,0,135,60.561,135,135S239.439,300,165,300z" fill="black"/>
	</svg>`;

	const encodedSvg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

	return `url("${encodedSvg}") ${size / 2} ${size / 2}, auto`;
};

export const eraserStrokeWidths = pencilStrokeWidths satisfies Record<
	string,
	ToolStrokeWidth
>;

export const eraserStrokeWidthsArray = Object.values(eraserStrokeWidths);

export const eraser = {
	type: "eraser" as const,
	name: "Eraser" as const,
	icon: <img src="/eraser.svg" alt="Eraser" className="h-4 w-4" />,
	tooltip: "Erase parts of drawing" as const,
	properties: {
		stroke: eraserStrokeWidths.regular,
		active: false as boolean,
	},
} satisfies Tool;
