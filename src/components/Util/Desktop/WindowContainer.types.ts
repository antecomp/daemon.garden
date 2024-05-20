import React, { CSSProperties, ReactNode } from "react"

export interface WindowProps  {
	width?: string;
	height?: string;
	className?: string;
	icon?: string; // TS seems to cast/alias image imports to just a string.
	zIndex?: number;
	windowKey?: string;
}

export interface WindowContainerProps extends WindowProps {
	children: ReactNode;
}

export interface WindowCSS extends CSSProperties {
	'--fadeDuration': string // string for units.
}