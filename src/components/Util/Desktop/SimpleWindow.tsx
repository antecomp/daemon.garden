import WindowContainer from "./WindowContainer";
import { WindowContainerProps } from "./WindowContainer.types"
import lcorner from '@/assets/ui/window/win_single_corner_left.png'
import rcorner from '@/assets/ui/window/win_single_corner_right.png'
import '@/styles/Util/Desktop/SimpleWindow.css'


const SimpleWindow = ({children, width, height, icon, className, zIndex = 0, windowKey, initialPosition}: WindowContainerProps) => {
	return (
		//<WindowContainer width={width} height={height} icon={icon} className={className} zIndex={zIndex} windowKey={windowKey} initialPosition={initialPosition}>
		<WindowContainer {...{width, height, icon, className, zIndex, windowKey, initialPosition}}>
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