import useDesktopContext from "@/hooks/useDesktopContext"
import useTypewriter from "@/hooks/useTypewriter"

/**
 * FauxScript is for quick fake/faux text typed out terminal info before closing their parent window.
 * 
 * To be used inside SimpleWindow.
 * @param self key to the window so it can close itself.
 * @param text the text to show
 * @param callback callback called on component close (when the text is done typing out.)
 */
const FauxScript = ({windowKey, text, callback, closeDelay = 500}: {windowKey: string, text: string, callback?: (() => void), closeDelay?: number}) => {
	
	const {removeWindow} = useDesktopContext()

	const handleComplete = () => {
		if(callback) callback();
		setTimeout(() => {
			removeWindow(windowKey)
		}, closeDelay);
	}
	
	const {displayText} = useTypewriter(`  ${text}`, 25, handleComplete)

	return (<div style={{whiteSpace: 'pre-line'}}>
		- {displayText}
	</div>)
}

export default FauxScript;