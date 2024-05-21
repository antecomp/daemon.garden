import Draggable, { ControlPosition } from "react-draggable"
import { WindowCSS, WindowContainerProps } from "./WindowContainer.types"
import eyeIcon from '@/assets/ui/window/icons/eye.png'
import closeIcon from '@/assets/ui/window/window_close.png'
import '@/styles/Util/Desktop/WindowContainer.css'
import { DesktopContext } from "./Desktop"
import { useContext, useEffect, useRef, useState } from "react"
import useViewportDimensions from "@/hooks/useViewportDimensions"
import { CLOSE_FADE_DURATION } from "./WindowContainer.config"

// Note that other programs that use windows should have an extension of the WindowContainerProps type.
// idk if I can enforce this any way tho
const WindowContainer = ({ children, width, height, icon = eyeIcon, className = '', zIndex = 0, windowKey, initialPosition }: WindowContainerProps) => {

	const DKT = useContext(DesktopContext);
	const vpd = useViewportDimensions();
	const windowRef = useRef<HTMLInputElement>(null);

	const [windowPos, setWindowPos] = useState<ControlPosition>({ x: (initialPosition?.x ?? 0),  y: (initialPosition?.y ?? 0)});
	const [isClosing, setIsClosing] = useState(false); // to trigger the animation.

	const centerWindow = () => {
		if (windowRef?.current?.offsetHeight) {
			setWindowPos({
				x: Math.round((vpd.width / 2) - (windowRef.current.offsetWidth / 2)),
				y: Math.round((vpd.height / 2) - (windowRef.current.offsetHeight / 2))
			})
		}
	}

	const handleClose = (e: React.MouseEvent) => {
		e.stopPropagation();

		setIsClosing(true);
		setTimeout(() => {
			DKT?.removeWindow(windowKey);
		}, CLOSE_FADE_DURATION)

	}

	// lol
	useEffect(() => {
		if (!initialPosition) {
			centerWindow();
		}
	}, [])

	if (!windowKey) {
		console.error('Warning: Window is missing windowKey prop. undefined only permitted so TS wouldnt yell at me. Something is wrong :)')
	}

	return (
		<Draggable
			handle=".window-handle span"
			//defaultPosition={{x: 100, y: 100}}
			//positionOffset={{x: '-50%', y: '-50%'}} // breaks the bounds shit.
			axis="none" // ref: https://github.com/react-grid-layout/react-draggable/issues/129#issuecomment-365892516 (we want to manually handle pos)
			position={windowPos}
			onDrag={(_, d) => { setWindowPos({ x: d.x, y: d.y }) }} // Oh you want to externally change position? Fuck you now you have to add your own drag event handler!!! - cool library that doesn't piss me off.
			scale={1}
			bounds='#desktop'
			onMouseDown={() => DKT?.raiseWindow(windowKey)}  // THIS IS CAUSING A FUCKTON OF WEIRD PROPOGATION ERRORS HELP!!!!
		>
			<div
				className={`window ${className} ${isClosing ? 'closing' : ''}`}
				style={
					{
						'width': width,
						'height': height,
						'zIndex': zIndex,
						'--fadeDuration': `${CLOSE_FADE_DURATION}ms`
					} as WindowCSS}
				onClick={() => DKT?.raiseWindow(windowKey)}
				ref={windowRef}
			>
				<div className="window-handle">
					<img src={icon} alt="" />
					<span></span> {/* Window title here if we end up doing that. */}
					<img className="close-icon" src={closeIcon} onClick={handleClose} alt="" />
				</div>
				{children}
			</div>
		</Draggable>
	)
}

export default WindowContainer;