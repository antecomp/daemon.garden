export type WindowKey = string;

export interface WindowData {
	// width/height strings for units.
	width?: `${number}px` | `${number}ch` | `${number}vw`;
	height?: `${number}px` | `${number}ch` | `${number}vh`;
	icon?: string;
	zIndex?: number; // if undefined, we know its gonna be 0.
	content: React.ReactElement; // Content doesn't have to be a window, in case we want other strange elements on the desktop!
	isPopup?: boolean
}

export interface DesktopContextType {
	/**
     * Adds a new window to the desktop.
     * @param {WindowKey} key - Unique key for the window.
     * @param {WindowData} data - Data for the window including content and dimensions.
     */
	addWindow(key: WindowKey, data: WindowData): void
	 /**
     * Removes a window from the desktop.
     * @param {WindowKey} key - Unique key for the window.
     */
	removeWindow: Function
	/**
     * Raises the z-index of a window, bringing it to the front. Will increase z-index ad-infinitum lol.
     * @param {WindowKey} key - Unique key for the window.
     */
	raiseWindow: Function
}