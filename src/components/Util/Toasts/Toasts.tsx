import { Slide, toast } from "react-toastify"

interface MessageData {
	title: string
	msg: string
	img: string
}

const Message = ({title, msg, img}: MessageData) => {
	return (
		<div className="toast-notification">
			<img src={img} alt="" style={{'imageRendering': 'auto'}} />
			<div>
				<h3>{title}</h3>
				{msg}
			</div>
		</div>
	)
}

export const sendMessageToast = (ND: MessageData): void => {
	toast(<Message {...ND} />, {transition: Slide})
}