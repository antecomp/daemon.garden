import Draggable from "react-draggable"
import { WindowContainerProps } from "./WindowContainer.types"
import eyeIcon from '@/assets/ui/window/icons/eye.png'
import closeIcon from '@/assets/ui/window/window_close.png'
import '@/styles/Util/Desktop/WindowContainer.css'
import { DesktopContext } from "./Desktop"
import { useContext } from "react"

const WindowContainer = ({children, width, height, icon = eyeIcon, className, zIndex = 0, windowKey} : WindowContainerProps) => {

	const DKT = useContext(DesktopContext)


	if(!windowKey) {
		console.error('Warning: Window is missing windowKey prop. undefined only permitted so TS wouldnt yell at me. Something is wrong :)')
	}

	return (
		<Draggable
			handle=".window-handle span"
			defaultPosition={{x:0, y:0}}
			scale={1}
			bounds='#desktop'
		>
			<div className={`window ${className}`} style={{'width': width, 'height': height, 'zIndex': zIndex}}>
				<div className="window-handle">
					<img src={icon} alt="" />
					<span></span> {/* Window title here if we end up doing that. */}
					<img className="close-icon" src={closeIcon} onClick={() => DKT?.removeWindow(windowKey)} alt="" />
				</div>
				{children}
			</div>
		</Draggable>
	)
}

export default WindowContainer;