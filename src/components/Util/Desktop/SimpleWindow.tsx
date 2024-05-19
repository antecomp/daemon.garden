import WindowContainer from "./WindowContainer";
import { WindowContainerProps } from "./WindowContainer.types"
import lcorner from '@/assets/ui/window/win_single_corner_left.png'
import rcorner from '@/assets/ui/window/win_single_corner_right.png'
import '@/styles/Util/Desktop/SimpleWindow.css'


const SimpleWindow = ({children, width, height, icon, className}: WindowContainerProps) => {
	return (
		<WindowContainer width={width} height={height} icon={icon} className={className}>
			<div className="window-content">
				{children}
			</div>
			<div className="window-footer">
				<img src={lcorner} alt="" />
				<span></span> {/* window buttons here? */}
				<img src={rcorner} alt="" />
			</div>
		</WindowContainer>
	)
}

export default SimpleWindow;