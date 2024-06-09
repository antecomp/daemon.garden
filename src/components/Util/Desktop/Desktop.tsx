import { cloneElement, useEffect, useState, createContext, KeyboardEventHandler } from 'react';
import '@/styles/Util/Desktop/Desktop.css'
import { WindowKey, WindowData, DesktopContextType } from './Desktop.types';
import SimpleWindow from './SimpleWindow';
import DemoDocument from '@/placeholders/DemoDocument';
import NSTracer from '@/components/NSTracer/NSTracer';
import Taskbar from './Taskbar/Taskbar';

// TODO Well wanna make some seperate way of saving the common windows with their icons, will be part of the 'bookmarks' the taskbar launches.
// Meaning this import is temp.
import NSTIcon from '@/assets/ui/window/icons/NST.png'
import EyeIcon from '@/assets/ui/window/icons/eye.png'
import { AssArray } from '@/extra.types';
import { getNextMapKey } from './helpers';
import FauxScript from '@/components/FauxScript/FauxScript';

/**
 * React context for signaling to the window manager (Desktop component).
 */
export const DesktopContext = createContext<DesktopContextType | null>(null);

/**
 * Desktop component. Renders and manages windows in the DE. Spans the entire screen.
 * Windows should be added directly to this with DesktopContext.
 * @component 
 */
const Desktop = () => {

	// Should this be moved to a global zustand state?
	const [windows, setWindows] = useState<Map<WindowKey, WindowData>>(new Map<WindowKey, WindowData>());
	const [maxZIndex, setMaxZIndex] = useState(1);
	const [currentRaisedWindowKey, setCurrentRaisedWindowKey] = useState('');

	/**
	 * Adds a new window to the desktop.
	 * @param {WindowKey} key - Unique key for the window. If key already exists, the existing window will be re-rendered with the new content.
	 * @param {WindowData} data - Data for the window including content and dimensions.
	 */
	const addWindow: DesktopContextType['addWindow'] = (key: WindowKey, data: WindowData) => {

		setWindows((prevWindows) => {
			const newWindows = new Map(prevWindows);
			// By the nature of this being a map, if the key already exists we overwrite the window (im fine with this behavior.)
			newWindows.set(key, data);
			return newWindows;
		})

	}

	/**
	* Removes a window from the desktop.
	* @param {WindowKey} key - Unique key for the window.
	*/
	const removeWindow = (key: WindowKey) => {
		setWindows((prevWindows) => {
			const newWindows = new Map(prevWindows);
			if (!newWindows.delete(key)) { console.error(`Cannot remove window that doesn't exist! Window: ${key} not found.`) };
			return newWindows;
		})
	}

	/**
	 * Raises the z-index of a window, bringing it to the front. Will increase z-index ad-infinitum lol.
	 * @param {WindowKey} key - Unique key for the window.
	 */
	const raiseWindow = (key: WindowKey) => {
		const win = windows.get(key);

		if (!win) {
			console.error('raiseWindow() failed. Window not found.')
			return;
		}

		win.zIndex = maxZIndex + 1;
		setMaxZIndex(prev => prev + 1);
		setCurrentRaisedWindowKey(key);
	}

	// Keyboard shortcuts for using the desktop :^)
	// It seems like this needs to be attached to the window rather than desktop,
	// otherwise the preventDefault doesn't talk to the browser.
	useEffect(() => {
		// Keybinds in here makes sense if we just want it's functions linked to the dependancy array of the useEffect.
		const keybinds: AssArray<(() => void)> = {
			'Tab': () => {
				const next = getNextMapKey(windows, currentRaisedWindowKey);
				if(next) raiseWindow(next);
			}
		}

		// Note to self: I can also do e.ctrlKey && .... to bind it to just control + keybind
		const handler = (e: KeyboardEvent) => {
			if(keybinds[e.key]) {
				keybinds[e.key]();
			}
		}

		// disables browser keybind.
		const overrider = (e: KeyboardEvent) => {
			if(keybinds[e.key]) {
				e.preventDefault()
			}
		}

		window.addEventListener("keyup", handler);
		window.addEventListener("keydown", overrider)

		return () => {
			window.removeEventListener("keyup", handler);
			window.removeEventListener("keydown", overrider)
		}

	}, [currentRaisedWindowKey, windows]) // Remember to add any dependancies of your keybind functions here :)




	useEffect(() => {
		addWindow("introtext", {
			content: (<SimpleWindow className='slop'>
				<DemoDocument />
			</SimpleWindow>),
			width: '75ch',
			icon: EyeIcon
		})

		addWindow("otherwindow", {
			content: (<SimpleWindow height='150px'>
				This window has a manually set height! <br/> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam commodi minus libero vitae, fuga ipsum suscipit animi rem odio, debitis vel culpa, nulla enim! Velit sed repellat natus error quo.
			</SimpleWindow>),
			width: '50ch'
		})

		addWindow("third", {
			content: (<SimpleWindow>
				Sloppum soyim ipsum cummum.
			</SimpleWindow>)
		})

		addWindow("NST", {
			content: (<NSTracer />),
			icon: NSTIcon
		})

	}, [])


	return (
		<DesktopContext.Provider value={{ addWindow, removeWindow, raiseWindow }}>
			<div id="desktop">
				{[...windows.entries()].map(([key, windowData]) => { // maybe move this stuff to a global context thingy (seperate from windowMap), so we can access the other actually rendered windows from anywhere :)
					const { content, ...rest } = windowData;
					// first key is for the iterator stuff, second is the key within the map. I hate programming.
					return cloneElement(content, { key, ...rest, windowKey: key }); // according to the react docs this is bad practice but their alternative doesnt work?? lmao???
				})}
			</div>
			<Taskbar raisedWK={currentRaisedWindowKey} winMap={windows}/>
		</DesktopContext.Provider>
	)
}

export default Desktop;