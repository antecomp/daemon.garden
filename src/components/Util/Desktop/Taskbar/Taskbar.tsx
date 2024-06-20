import useDesktopContext from "@/hooks/useDesktopContext";
import { WindowData, WindowKey } from "../Desktop.types";
import '@/styles/Util/Desktop/Taskbar/Taskbar.css'
import tbClose from '@/assets/ui/extra/tb_close.png'

const Taskbar = ({winMap, raisedWK} : {winMap: Map<WindowKey, WindowData>, raisedWK: string}) => {
    const {removeWindow, raiseWindow} = useDesktopContext();
    

    return (
        <div className="taskbar">
            {[...winMap.entries()].map(slop => // I dont know why I couldnt spread [key, value] here??
                {if (!slop[1].isPopup) return (<span
                    key={`taskbar-${slop[0]}`} 
                    className={`taskbar-item ${slop[0] == raisedWK ? 'active' : ''}`}
                    onClick={() => raiseWindow(slop[0])}
                >
                    <span>
                        <img src={slop[1].icon} alt="" />
                        {slop[0]}
                    </span>
                    <img
                        src={tbClose}
                        onClick={(e) => {e.stopPropagation(); removeWindow(slop[0])}}
                    />
                </span>)}
            )}
            <span className="spacer"></span>
        </div>
    )
}

export default Taskbar;