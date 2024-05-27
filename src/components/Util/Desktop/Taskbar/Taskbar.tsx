import useDesktopContext from "@/hooks/useDesktopContext";
import { WindowKey } from "../Desktop.types";
import '@/styles/Util/Desktop/Taskbar/Taskbar.css'
import tbClose from '@/assets/ui/extra/tb_close.png'

const Taskbar = ({windows, raisedWK} : {windows: WindowKey[], raisedWK: string}) => {
    const {addWindow, removeWindow, raiseWindow} = useDesktopContext();

    return (
        <div className="taskbar">
            {windows.map(windowKey => 
                <span
                    key={`taskbar-${windowKey}`} 
                    className={`taskbar-item ${windowKey == raisedWK ? 'active' : ''}`}
                    onClick={() => raiseWindow(windowKey)}
                >
                    <span>{windowKey}</span>
                    <img
                        src={tbClose}
                        onClick={(e) => {e.stopPropagation(); removeWindow(windowKey)}}
                    />
                </span>
            )}
            <span className="spacer"></span>
        </div>
    )
}

export default Taskbar;