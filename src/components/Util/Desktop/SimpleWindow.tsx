import WindowContainer from "./WindowContainer";
import { WindowContainerProps } from "./WindowContainer.types"
import lcorner from '@/assets/ui/window/win_single_corner_left.png'
import rcorner from '@/assets/ui/window/win_single_corner_right.png'
import '@/styles/Util/Desktop/SimpleWindow.css'

/**
 * SimpleWindow component providing a basic window layout for rendering JSX children. Adds cut-corner border decoration.
 * @component
 * @param {WindowContainerProps} props - These props get directly passed to WindowContainer, and therefore are under the same conventions.
 * @returns {JSX.Element}
 */
const SimpleWindow = ({children, width, height, icon, className, zIndex = 0, windowKey, initialPosition, isPopup = false}: WindowContainerProps) => {
	return (
		//<WindowContainer width={width} height={height} icon={icon} className={className} zIndex={zIndex} windowKey={windowKey} initialPosition={initialPosition}>
		<WindowContainer {...{width, height, icon, className, zIndex, windowKey, initialPosition, isPopup}}>
			<div className="window-content">
				{children}
			</div>
			<div className="window-footer">
				<img src={lcorner} alt="" />
				<span></span> {/* menu buttons like ok/cancel here? */}
				<img src={rcorner} alt="" />
			</div>
		</WindowContainer>
	)
}

export default SimpleWindow;