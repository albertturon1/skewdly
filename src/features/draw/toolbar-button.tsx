import { cn } from "../../lib/utils";

export type HistoryButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	containerClass?: string;
};

export function ToolbarButton({
	children,
	containerClass,
	...props
}: HistoryButtonProps) {
	return (
		<div className={cn("hover:bg-slate-100 rounded-lg", containerClass)}>
			<button
				type="button"
				className="disabled:opacity-30 p-2 h-10 w-10 flex items-center justify-center text-lg"
				{...props}
			>
				{children}
			</button>
		</div>
	);
}
