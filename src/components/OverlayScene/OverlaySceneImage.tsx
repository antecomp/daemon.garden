import { useEffect, useState } from "react"
import { FADE_DURATION } from "./OverlayScene.config";
import transitionGif from '@/assets/images/overlayfade.gif'
import overlayBlank from '@/assets/images/overlay-base.png'

const OverlaySceneImage = ({newImage = overlayBlank}: {newImage?: string}) => {
	const [showGif, setShowGif] = useState(false)
	const [currentImage, setCurrentImage] = useState<string>(newImage);
	const [previousImage, setPreviousImage] = useState<string | null>(null);

	useEffect(() => {
		if (newImage !== currentImage) {
			setShowGif(true);
			setPreviousImage(currentImage);
			setCurrentImage(newImage);

			const timer = setTimeout(() => {
				setShowGif(false)
				setPreviousImage(null)
			}, FADE_DURATION)

			return () => clearTimeout(timer);
		}
	}, [newImage])

	return (
		<div className="overlayscene-image-container" style={{width: '427px', height: '378px', position: 'relative', margin: '0 auto' }}>
			{previousImage && (
				<img 
					src={previousImage}
					style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
					alt="" 
				/>
			)}

			<img src={currentImage} alt="COOL IMAGE YOU'RE SUPPOSED TO SEE LOL" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />

		{showGif && (
        <img
          src={transitionGif}
          alt="Transition"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
			zIndex: 9999,
            height: '100%',
            pointerEvents: 'none', // Ensures that the GIF doesn't interfere with any user interactions
          }}
        />
      )}
		</div>
	)
}

export default OverlaySceneImage;