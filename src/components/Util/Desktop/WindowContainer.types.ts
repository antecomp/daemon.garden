import { CSSProperties, ReactNode } from "react"
import { WindowData } from "./Desktop.types";
import { Point } from "@/extra.types";

export interface WindowProps extends Omit<WindowData, 'content'> {
	windowKey?: string;
	initialPosition?: Point
	className?: string;
}

export interface WindowContainerProps extends WindowProps {
	children: ReactNode;
}

export interface WindowCSS extends CSSProperties {
	'--fadeDuration': string // string for units.
}