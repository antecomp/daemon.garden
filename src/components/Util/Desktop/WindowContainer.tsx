import Draggable, { ControlPosition } from "react-draggable"
import { WindowCSS, WindowContainerProps } from "./WindowContainer.types"
import eyeIcon from '@/assets/ui/window/icons/eye.png'
import closeIcon from '@/assets/ui/window/window_close.png'
import '@/styles/Util/Desktop/WindowContainer.css'
import { useEffect, useRef, useState } from "react"
import useViewportDimensions from "@/hooks/useViewportDimensions"
import { CLOSE_FADE_DURATION } from "./WindowContainer.config"
import useDesktopContext from "@/hooks/useDesktopContext"

/**
 * Draggable window container component for the desktop environment. This only provides the Draggable container and the "handle."
 * NOTE: Other programs that use windows should extend the WindowContainerProps here. Desktop.tsx needs to drill info like z-Index down!!
 * @component
 * @param {WindowContainerProps} props - The properties for the window container.
 * @returns {JSX.Element} The window container element.
 */
const WindowContainer = ({ children, width, height, icon = eyeIcon, className = '', zIndex = 0, windowKey, initialPosition }: WindowContainerProps) => {

	const { removeWindow, raiseWindow } = useDesktopContext();
	const vpd = useViewportDimensions();
	const windowRef = useRef<HTMLInputElement>(null);

	const [windowPos, setWindowPos] = useState<ControlPosition>({ x: (initialPosition?.x ?? 0), y: (initialPosition?.y ?? 0) });
	const [isClosing, setIsClosing] = useState(false); // to trigger the animation.

	const centerWindow = () => {
		if (windowRef?.current?.offsetHeight) {
			setWindowPos({
				x: Math.round((vpd.width / 2) - (windowRef.current.offsetWidth / 2)),
				y: Math.round((vpd.height / 2) - (windowRef.current.offsetHeight / 2))
			})
		}
	}

	// For the X button on the window :)
	const handleClose = (e: React.MouseEvent) => {
		e.stopPropagation();

		setIsClosing(true);
		setTimeout(() => {
			removeWindow(windowKey);
		}, CLOSE_FADE_DURATION)

	}

	// If no initial position is provided, the window will implicitely center itself on load.
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
			onMouseDown={() => raiseWindow(windowKey)}  // this can lead to some annoying propagation. Just remember to stopProp on mouseDown because the onClick never triggers :D
			nodeRef={windowRef} // literally just so React strictmode will shut the fuck up: https://stackoverflow.com/questions/63603902/finddomnode-is-deprecated-in-strictmode-finddomnode-was-passed-an-instance-of-d
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
				onClick={() => raiseWindow(windowKey)}
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