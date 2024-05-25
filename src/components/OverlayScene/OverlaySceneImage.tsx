import '@/styles/OverlayScene/OverlaySceneImage.css'

const OverlaySceneImage = ({newImage}: {newImage?: string}) => {
	return (
		<div key={newImage} className="overlayimage-container fade-image">
			<img src={newImage} alt="" /> {/* the use of key causes the CSS animation to trigger whenever newImage changes. */}
		</div>
	)
}

export default OverlaySceneImage