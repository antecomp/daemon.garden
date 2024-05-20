export type WindowKey = string;

export interface WindowData {
	// width/height strings for units.
	width?: string;
	height?: string;
	icon?: string;
	zIndex?: number; // if undefined, we know its gonna be 0.
	content: React.ReactElement; // Can/Should I enforce that stuff needs to be wrapped in WindowContainer, at some level??
}

export interface DesktopContextType {
	addWindow: Function
	removeWindow: Function
	raiseWindow: Function
}