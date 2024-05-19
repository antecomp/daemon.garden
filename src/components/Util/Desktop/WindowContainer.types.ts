import { ReactNode } from "react"

export type WindowContainerProps = {
	children: ReactNode;
	// String because we want units.
	width?: string;
	height?: string;
	className?: string;
	icon?: string; // TS seems to cast/alias image imports to just a string.
	onClick?: Function;
}