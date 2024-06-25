import { Point } from "@/extra.types";
import { CSSProperties, ReactNode } from "react";

export interface TooltipProps {
	children: ReactNode
	className?: string
	offset?: Point
	delay?: `${number}s` | `${number}ms`
}

export interface TooltipCSS extends CSSProperties {
	'--tooltip-delay': string
}

export interface TooltipWrapperProps extends TooltipProps {
	tooltipChildren: ReactNode
	enabled?: boolean
}