import Draggable from "react-draggable"
import { WindowContainerProps } from "./WindowContainer.types"
import eyeIcon from '@/assets/ui/window/icons/eye.png'
import closeIcon from '@/assets/ui/window/window_close.png'
import '@/styles/Util/Desktop/Window.css'

const WindowContainer = ({children, width, height, icon = eyeIcon} : WindowContainerProps) => {
	return (
		<Draggable
			handle=".window-handle span"
			defaultPosition={{x:0, y:0}}
			scale={1}
			bounds='#desktop'
		>
			<div className="window" style={{'width': width, 'height': height}}>
				<div className="window-handle">
					<img src={icon} alt="" />
					<span></span> {/* Window title here if we end up doing that. */}
					<img src={closeIcon} alt="" />
				</div>
				{children}
			</div>
		</Draggable>
	)
}

export default WindowContainer;