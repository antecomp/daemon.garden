import { ReactNode, useContext, useEffect, useRef, useState } from "react"
import { NSTracerContext } from "./NSTracer"
import '@/styles/NSTracer/NSPrompt.css'
import { getMousePosition } from "@/util/getMousePosition"

export interface NSPromptProps {
	display: ReactNode
	callback: (response: "connect" | "cancel" | "traverse") => void;
}

/**
 * Popup tooltip-looking confirmation prompt that appears when the player clicks on a node. 
 * Summoned by triggerNewConfirmation() in NSTracer (called by Node via context). 
 * This also loads a bunch of temporary event listeners to implicitely cancel ("by suicide") 
 * if the user clicks anything other than elements within NSPrompt.
 * @param param0 
 * @returns 
 */
const NSPrompt = ({ display, callback }: NSPromptProps) => {
	const NSTC = useContext(NSTracerContext)
	const [spawnAt, _] = useState(getMousePosition())
	const tooltipRef = useRef<HTMLDivElement>(null);

	function handleClick(response: "connect" | "cancel") {
		callback(response);
		NSTC?.setConfirmationText(null);
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
			callback("cancel")
			NSTC?.setConfirmationText(null);
		}
	};


	useEffect(() => {

		// Need this tiny timeout to prevent immediate suicide from a mouse event that was in-progress while this was mounting.
		setTimeout(() => {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('wheel', handleClickOutside);
		}, 1)



		// Cleanup the event listeners on component unmount
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.addEventListener('wheel', handleClickOutside);
		};
	}, [display]);


	return (
		<div className="ns-prompt" style={{ top: spawnAt.y, left: spawnAt.x }} ref={tooltipRef}>
			{display}
			<span className="ns-prompt-footer">
				<a onClick={() => handleClick("connect")}>connect</a>
				<a onClick={() => handleClick("cancel")}>cancel</a>
			</span>
		</div>
	)
}

export default NSPrompt