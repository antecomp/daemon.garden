import { cloneElement, useEffect, useState, createContext, useRef, useCallback } from 'react';
import '@/styles/Util/Desktop/Desktop.css';
import { WindowKey, WindowData, DesktopContextType } from './Desktop.types';
import NSTracer from '@/components/NSTracer/NSTracer';
import Taskbar from './Taskbar/Taskbar';
import NSTIcon from '@/assets/ui/window/icons/NST.png';
import { AssArray } from '@/extra.types';
import { getNextMapKey } from './helpers';
import Mnemosyne from '@/components/Mnemosyne/Mnemosyne';

export const DesktopContext = createContext<DesktopContextType | null>(null);

const Desktop = () => {
    const [windows, setWindows] = useState<Map<WindowKey, WindowData>>(new Map());
    const maxZIndex = useRef(1);
    const [currentRaisedWindowKey, setCurrentRaisedWindowKey] = useState('');

    const addWindow: DesktopContextType['addWindow'] = useCallback((key: WindowKey, data: WindowData) => {
        setWindows((prevWindows) => {
            const newWindows = new Map(prevWindows);
            newWindows.set(key, data);
            return newWindows;
        });
    }, []);

    const removeWindow = useCallback((key: WindowKey) => {
        setWindows((prevWindows) => {
            const newWindows = new Map(prevWindows);
            if (!newWindows.delete(key)) {
                console.error(`Cannot remove window that doesn't exist Window: ${key} not found.`);
            }
            return newWindows;
        });
    }, []);

    const raiseWindow = useCallback((key: WindowKey) => {
        const win = windows.get(key);

        if (!win) {
            console.error(`raiseWindow() failed. Window ${key} not found.`);
            return;
        }

        win.zIndex = ++maxZIndex.current;
        setCurrentRaisedWindowKey(key);
    }, [windows]);

    const getWindowData = useCallback((key: WindowKey) => {
        return windows.get(key)?? null;
    }, [windows]);

    useEffect(() => {
        const keybinds: AssArray<(() => void)> = {
            'Tab': () => {
                const next = getNextMapKey(windows, currentRaisedWindowKey);
                if (next) raiseWindow(next);
            },
        };

        const handler = (e: KeyboardEvent) => {
            if (keybinds[e.key]) {
                keybinds[e.key]();
            }
        };

        const overrider = (e: KeyboardEvent) => {
            if (keybinds[e.key]) {
                e.preventDefault();
            }
        };

        window.addEventListener("keyup", handler);
        window.addEventListener("keydown", overrider);

        return () => {
            window.removeEventListener("keyup", handler);
            window.removeEventListener("keydown", overrider);
        };
    }, [currentRaisedWindowKey, windows, raiseWindow]);

    useEffect(() => {
        addWindow("mnemosyne", {
            content: (<Mnemosyne />),
        });

        addWindow("no", {
            content: (<NSTracer />),
            icon: NSTIcon,
        });
    }, []);

    const MemoizedCloneElement = useCallback(({windowData, windowKey}: {windowData: WindowData, windowKey: string}) => {
		const { content, ...rest } = windowData;
        return cloneElement(content, {...rest, windowKey: windowKey});
    }, []);

    return (
        <DesktopContext.Provider value={{ addWindow, removeWindow, raiseWindow, getWindowData }}>
            <div id="desktop">
                {[...windows.entries()].map(([key, windowData]) => {
                    return <MemoizedCloneElement key={key} windowKey={key} windowData={windowData} />;
                })}
            </div>
            <Taskbar raisedWK={currentRaisedWindowKey} winMap={windows} />
        </DesktopContext.Provider>
    );
};

export default Desktop;
