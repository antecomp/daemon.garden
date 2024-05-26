import useDesktopContext from "@/hooks/useDesktopContext";
import { WindowKey } from "../Desktop.types";
import '@/styles/Util/Desktop/Taskbar/Taskbar.css'

const Taskbar = ({windows, raisedWK} : {windows: WindowKey[], raisedWK: string}) => {
    const {addWindow, removeWindow, raiseWindow} = useDesktopContext();

    console.log(raisedWK)

    return (
        <div className="taskbar">
            {windows.map(windowKey => 
                <span
                    key={`taskbar-${windowKey}`} 
                    className={`taskbar-item ${windowKey == raisedWK ? 'active' : ''}`}
                    onClick={() => raiseWindow(windowKey)}
                >
                    {windowKey}
                    <span
                        onClick={(e) => {e.stopPropagation(); removeWindow(windowKey)}}
                    >
                        &nbsp; (X)
                    </span>
                </span>
            )}
            <span className="spacer"></span>
        </div>
    )
}

export default Taskbar;