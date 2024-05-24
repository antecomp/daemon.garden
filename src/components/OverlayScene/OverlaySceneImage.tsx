import { useEffect, useState } from "react"
//import { FADE_DURATION } from "./OverlayScene.config";
import fadeOutGif from './assets/fade_out.gif'
import fadeInGif from './assets/fade_in.gif'
import '@/styles/OverlayScene/OverlaySceneImage.css'

const OverlaySceneImage = ({newImage}: {newImage?: string}) => {
	return (
		<div className="overlayimage-container">
			<img key={newImage} src={newImage} alt="" className="fade-image" /> {/* the use of key causes the CSS animation to trigger whenever newImage changes. */}
		</div>
	)
}

export default OverlaySceneImage