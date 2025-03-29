import {
	useState,
	useRef,
	useLayoutEffect,
	useCallback,
	type ReactNode,
} from "react";

interface TooltipProps {
	content: string;
	children: ReactNode;
}

type Placement = "top" | "bottom";

export function Tooltip({ content, children }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);
	const [position, setPosition] = useState({ top: 0, left: 0 });
	const [placement, setPlacement] = useState<Placement>("bottom");
	const triggerRef = useRef<HTMLDivElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);

	const calculatePosition = useCallback(() => {
		if (!triggerRef.current || !tooltipRef.current) {
			return;
		}

		const triggerRect = triggerRef.current.getBoundingClientRect();
		const tooltipRect = tooltipRef.current.getBoundingClientRect();
		const viewportHeight = window.innerHeight;
		const viewportWidth = window.innerWidth; // Added for potential horizontal checks later

		const spaceAbove = triggerRect.top;
		const spaceBelow = viewportHeight - triggerRect.bottom;
		const tooltipHeight = tooltipRect.height;
		const tooltipWidth = tooltipRect.width;
		const margin = 8; // Space between trigger and tooltip

		let newPlacement: Placement = placement; // Prefer keeping current placement if possible
		let top = 0;
		let left = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2; // Center horizontally

		// Check if it fits below and there's more space below OR not enough space above
		if (
			spaceBelow >= tooltipHeight + margin &&
			(spaceBelow >= spaceAbove || spaceAbove < tooltipHeight + margin)
		) {
			newPlacement = "bottom";
			top = triggerRect.bottom + margin;
		} else if (spaceAbove >= tooltipHeight + margin) {
			// Check if it fits above
			newPlacement = "top";
			top = triggerRect.top - tooltipHeight - margin;
		} else {
			// Default fallback: Place below and adjust if needed
			newPlacement = "bottom";
			top = triggerRect.bottom + margin;
			// Adjust if it goes off-screen vertically downwards
			if (top + tooltipHeight > viewportHeight - margin) {
				// Try placing above as a last resort if it fits
				if (spaceAbove >= tooltipHeight + margin) {
					newPlacement = "top";
					top = triggerRect.top - tooltipHeight - margin;
				} else {
					// Stick to bottom but push it up from the edge
					top = viewportHeight - tooltipHeight - margin;
				}
			}
		}

		// Prevent tooltip going off-screen horizontally
		if (left < margin) {
			left = margin;
		} else if (left + tooltipWidth > viewportWidth - margin) {
			left = viewportWidth - tooltipWidth - margin;
		}

		setPosition({ top, left });
		setPlacement(newPlacement);
	}, [placement]);

	// Use useLayoutEffect to calculate after render but before paint
	useLayoutEffect(() => {
		if (isVisible) {
			// Initial calculation
			calculatePosition();

			// Recalculate on scroll and resize while visible
			window.addEventListener("scroll", calculatePosition, true); // Use capture phase
			window.addEventListener("resize", calculatePosition);
			return () => {
				window.removeEventListener("scroll", calculatePosition, true);
				window.removeEventListener("resize", calculatePosition);
			};
		}
	}, [isVisible, calculatePosition]);

	const handleMouseEnter = () => {
		setIsVisible(true); // Set visible first to allow measurement in useLayoutEffect
	};

	const handleMouseLeave = () => {
		setIsVisible(false);
	};

	return (
		<div
			ref={triggerRef}
			className="relative inline-flex"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}
			{/* Tooltip Content */}
			<div
				ref={tooltipRef}
				role="tooltip"
				style={{ top: `${position.top}px`, left: `${position.left}px` }}
				className={`fixed z-99 transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
			>
				{/* Tooltip Box */}
				<div className="relative bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
					{content}
					{/* Arrow */}
					<div
						className={`
              absolute left-1/2 -translate-x-1/2
              border-4 border-transparent
              ${
								placement === "bottom"
									? "bottom-full border-b-gray-900 mb-[-4px]" // Arrow points up
									: "top-full border-t-gray-900 mt-[-4px]" // Arrow points down
							}
            `}
					/>
				</div>
			</div>
		</div>
	);
}
