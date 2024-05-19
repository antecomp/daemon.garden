// Implement add/remove functions and add them to the desktop context.

// Before you get super deep into the code, also figure out how the "taskbar" or whatever will work. Or just in general what will invoke calls to add new windows
// what will remove them, and how you will enforce uniqueness or whatever (for example it'd be nice if clicking on the taskbar either opens something, or 'focus's' it).

import { cloneElement, useEffect, useState } from 'react';

import { WindowKey, WindowData } from './Desktop.types';
import SimpleWindow from './SimpleWindow';
import IntroText from '@/placeholders/IntroText';

const Desktop = () => {

	// Should this be moved to a global zustand state?
	const [windows, setWindows] = useState<Map<WindowKey, WindowData>>(new Map<WindowKey, WindowData>());

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

	useEffect(() => {
		addWindow("introtext", {
			content: (<SimpleWindow>
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
	}, [])


	return (
		<div id="desktop">
			{[...windows.entries()].map(([key, windowData]) => {
				const {content, ...rest} = windowData;
				return cloneElement(content, {key, ...rest});
			})}
		</div>
	)
}

export default Desktop;