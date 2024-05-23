import { Slide, toast } from "react-toastify"

interface MessageData {
	title: string
	msg: string
	img: string
}

interface MessageCompProps extends MessageData {
	closeToast?: any // todo change: I just don't know what the type of this is lol
	toastProps?: any
}

const Message = ({closeToast, toastProps, title, msg, img}: MessageCompProps) => {
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