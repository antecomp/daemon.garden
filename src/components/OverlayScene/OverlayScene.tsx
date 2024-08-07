import useTypewriter from "@/hooks/useTypewriter";
import { useEffect, useRef, useState } from "react";
import { useModalWindow } from "react-modal-global";
import { FADE_DURATION, SCENE_FOLDER } from "./OverlayScene.config";
import { OverlayTextCSS, SceneData } from "./OverlayScene.types";
import '@/styles/OverlayScene/OverlayScene.css'
import OverlaySceneImage from "./OverlaySceneImage";
import { load } from "@/util/load";

/**
 * OverlayScene is for the game "cutscene" events that take up the entire screen. This is not to be confused with dialogue. 
 * Overlayscene has no option/user input handling, it simply goes through a set of text and images.
 * The files that OverlayScene loads are typeset by the SceneData[] interface in OverlayScene.types.ts
 * @param file name of the file to load, will load \@/data/scenes/<file>.ts
 */
const OverlayScene = ({file}: {file: string}) => {
	const modal = useModalWindow()

	// For the entire scene object
	const [scene, setScene] = useState<SceneData[] | null>(null);
	const sceneIndex = useRef(0);

	const [currentFrame, setCurrentFrame] = useState<SceneData>({text: ""});

	// Load initial frame
	useEffect(() => {
		(async () => {
			try {
				const loadedScene = await load<SceneData[]>(SCENE_FOLDER, file);
				setScene(loadedScene)
				setCurrentFrame(loadedScene[0])


				loadedScene.forEach(frame => {
					if (frame.image) { // Attempt to preload images - I have no idea if this works.
						const preLoadedImage = new Image();
						preLoadedImage.src = frame.image 
					}
				})



			} catch (err) { // TODO: add actual handling of this lol.
				console.error(err)
				modal.close()
			}
		})()
	}, [file])

	const {displayText, skipTypingAnimation, isFinished} = useTypewriter(currentFrame.text, 50);

	const [fadeText, setFadeText] = useState(false); // used for the animation before advancing the text.

	const handleAdvance = () => {
		if(isFinished) {

			// Trigger postEvent before advancing the text. Easier to do it this way since we listen for advance.
			if (currentFrame.postEvent) {currentFrame.postEvent()}

			// If no next scene
			if(!scene || !(scene[sceneIndex.current +1])) {
				setCurrentFrame({text: "", color: "black"}) // Remember that modal doesn't unmount, so we need to give something to useTypewriter
				modal.close()
				return;
			}

			setFadeText(true)
			setTimeout(() => {
				sceneIndex.current += 1;
				setCurrentFrame(scene[sceneIndex.current]);
				setFadeText(false);
			}, FADE_DURATION)
		
		} else {
			skipTypingAnimation();
		}
	}


	return (
		<div 
			className="OverlayScene"
			onClick={!fadeText ? handleAdvance : undefined} 
		>
			<div className="scene-con">
			<OverlaySceneImage newImage={currentFrame.image}/>
			<p
				style={
					{
						...currentFrame.style, 
						color: currentFrame.color, 
						'--fadeDuration': `${FADE_DURATION *2}ms`
					} as OverlayTextCSS
				}

				className={fadeText ? 'overlay-fade-out' : ''}
			>
				{displayText}
			</p>
			</div>
		</div>
	)


}

export default OverlayScene;