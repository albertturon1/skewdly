import type { ReactNode } from "react";

export function ToolOptionsWrapper({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col gap-2 [&>*:not(:last-child)]:pb-4 [&>*:not(:last-child)]:border-b-[1px] [&>*:not(:last-child)]:border-gray-300">
			{children}
		</div>
	);
}
