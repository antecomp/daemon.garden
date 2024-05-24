import { useCallback, useEffect, useRef, useState } from "react"

/**
 * 
 * @param text The text to type out. Animation automatically triggered when this is updated, meaning this is best linked to some state var.
 * @param delay The delay between typing characters (in ms)
 * @param onComplete Callback function called when typing is complete.
 * @returns displayText - updating string state that's the currently "typed" text
 * @returns skipTypingAnim - void method for pre-emptively filling all the text in, skipping the animation
 * @returns isFinished - updating boolean state for tracking if the text has finished typing out // Preferably only used for conditional renders, rely on callback for timed logic.
 */
const useTypewriter = (text: string, delay = 50, onComplete = (): any => {}) => { // Giving onComplete this default to prevent weird behavior I had in the JS implementation.
	const [displayText, setDisplayText] = useState('');
	const [isFinished, setFinished] = useState(false);
	const [prevText, setPrevText] = useState(text)
	const callbackCalled = useRef(false)

	// Reset needed state when text changes
	useEffect(() => {
		if(prevText !== text) {
			setDisplayText('');
			setFinished(false);
			setPrevText(text);
			callbackCalled.current = false;
		}
	}, [text, prevText])


	useEffect(() => {
		let typingInterval: NodeJS.Timeout;
		if(!isFinished) {
			typingInterval = setInterval(() => {
				if(displayText.length < text.length) {
					setDisplayText(prev => prev + text.charAt(prev.length));
				} else { // finished typing naturally
					clearInterval(typingInterval);
					if (!callbackCalled.current) {
						callbackCalled.current = true; 
						setFinished(true);
						onComplete();
					}
				}
			}, delay)
		}

		return () => {clearInterval(typingInterval)}

	}, [text, delay, isFinished, onComplete]);

	const skipTypingAnimation = useCallback(() => {
		if(!isFinished) {
			setDisplayText(text);
			setFinished(true);
			if(!callbackCalled.current) {
				callbackCalled.current = true;
				onComplete();
			}
		}
	}, [text, isFinished, onComplete])

	return {displayText, skipTypingAnimation, isFinished}

};

export default useTypewriter;