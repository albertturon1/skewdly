import type { Tool } from "../tools";
import { pencilStrokeWidths } from "./pencil";

export const EraserCursor = (size: number) => {
	const realSize = size;
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${realSize}" height="${realSize}" viewBox="0 0 330 330">
	  <path d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.982,0,165,0z M165,300
	  C90.561,300,30,239.44,30,165S90.561,30,165,30c74.439,0,135,60.561,135,135S239.439,300,165,300z" fill="black"/>
	</svg>`;

	const encodedSvg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

	return `url("${encodedSvg}") ${realSize / 2} ${realSize / 2}, auto`;
};

export const eraserStrokeWidths = pencilStrokeWidths;

export const eraserStrokeWidthsArray = Object.values(eraserStrokeWidths);

export const eraser = {
	type: "eraser" as const,
	name: "Eraser" as const,
	icon: "🧹" as const,
	tooltip: "Erase parts of drawing" as const,
	properties: {
		stroke: eraserStrokeWidths.regular,
		active: false as boolean,
	},
} satisfies Tool;
