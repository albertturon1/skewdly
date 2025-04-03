import { cn } from "@/lib/utils";

export type ToolOptionButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	children: React.ReactNode;
	isSelected: boolean;
};

export function ToolOptionButton({
	children,
	isSelected,
	onClick,
	className,
	...props
}: ToolOptionButtonProps) {
	return (
		<button
			{...props}
			type="button"
			onClick={onClick}
			className={cn(
				"flex flex-1 p-1 aspect-square items-center justify-center rounded-lg bg-slate-100/50 hover:bg-slate-350 ring-1",
				isSelected
					? "bg-slate-200 ring-offset-1 ring-blue-500"
					: "ring-gray-200",
				className,
			)}
		>
			<div className="w-6 flex justify-center items-center">{children}</div>
		</button>
	);
}
