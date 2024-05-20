// Implement add/remove functions and add them to the desktop context.

// Before you get super deep into the code, also figure out how the "taskbar" or whatever will work. Or just in general what will invoke calls to add new windows
// what will remove them, and how you will enforce uniqueness or whatever (for example it'd be nice if clicking on the taskbar either opens something, or 'focus's' it).

import { cloneElement, useEffect, useState, createContext } from 'react';
import '@/styles/Util/Desktop/Desktop.css'
import { WindowKey, WindowData, DesktopContextType } from './Desktop.types';
import SimpleWindow from './SimpleWindow';
import IntroText from '@/placeholders/IntroText';

// TypeScript why.
export const DesktopContext = createContext<DesktopContextType | null>(null);

const Desktop = () => {

	// Should this be moved to a global zustand state?
	const [windows, setWindows] = useState<Map<WindowKey, WindowData>>(new Map<WindowKey, WindowData>());
	const [maxZIndex, setMaxZIndex] = useState(1);
	
	const addWindow = (key: WindowKey, data: WindowData) => {

		setWindows((prevWindows) => {
			const newWindows = new Map(prevWindows);
			// todo add check for key already existing.
			newWindows.set(key, data);
			return newWindows;
		})
	}

	const removeWindow = (key: WindowKey) => {
		setWindows((prevWindows) => {
			const newWindows = new Map(prevWindows);
			// todo: add check for key not existing.
			newWindows.delete(key);
			return newWindows;
		})
	}

	// Just keep increasing z-index's lol.
	const raiseWindow = (key: WindowKey) => {
		const win = windows.get(key);

		if(!win) {
			console.error('raiseWindow() failed. Window not found.')
			return;
		}

		win.zIndex = maxZIndex + 1;
		setMaxZIndex(prev => prev +1);
	}

	// Remember, the map key (first argument) must match the windowKey!
	useEffect(() => {
		addWindow("introtext", {
			content: (<SimpleWindow className='slop'>
				<IntroText />
			</SimpleWindow>),
			width: '75ch'
		})

		addWindow("otherwindow", {
			content: (<SimpleWindow>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam commodi minus libero vitae, fuga ipsum suscipit animi rem odio, debitis vel culpa, nulla enim! Velit sed repellat natus error quo.
			</SimpleWindow>),
			width: '50ch'
		})

		addWindow("third", {
			content: (<SimpleWindow>
				Sloppum soyim ipsum cummum.
			</SimpleWindow>)
		})

	}, [])


	return (
		<DesktopContext.Provider value={{addWindow, removeWindow, raiseWindow}}>
		<div id="desktop">
			{[...windows.entries()].map(([key, windowData]) => { // maybe move this stuff to a global context thingy, so we can access the other actually rendered windows from anywhere :)
				const {content, ...rest} = windowData;
				// first key is for the iterator stuff, second is the key within the map. I hate programming.
				return cloneElement(content, {key, ...rest, windowKey: key}); // according to the react docs this is bad practice but their alternative doesnt work?? lmao???
			})}
		</div>
		</DesktopContext.Provider>
	)
}

export default Desktop;