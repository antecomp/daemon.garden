import { ReactNode, useContext, useEffect, useRef, useState } from "react"
import { NSTracerContext } from "./NSTracer"
import '@/styles/NSTracer/NSPrompt.css'
import { getMousePosition } from "@/util/getMousePosition"

interface NSPromptProps {
	display: ReactNode
	callback: Function
}

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
			callback("cancel by suicide")
			NSTC?.setConfirmationText(null);
		}
	  };


	useEffect(() => {

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
			<hr />
			<button onClick={() => handleClick("connect")}>connect</button>
			<button onClick={() => handleClick("cancel")}>cancel</button>
		</div>
	)
}

export default NSPrompt