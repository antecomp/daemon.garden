export type WindowKey = string;

export interface WindowData {
	// width/height strings for units.
	width?: string;
	height?: string;
	icon?: string;
	content: React.ReactElement; // Can/Should I enforce that stuff needs to be wrapped in WindowContainer, at some level??
}