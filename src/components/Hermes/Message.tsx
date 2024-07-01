import { useEffect, useRef } from 'react'
import dogtagFirst from './assets/dogtag_first.png'
import dogtagLast from './assets/dogtag_last.png'
import { HermesMessageProps } from "@/types/hermes.types";

const Message = ({name, content}: Omit<HermesMessageProps, 'renderKey'>) => {

	const elementBodyRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		elementBodyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}, [])

	return (
		<div className="message-body" ref={elementBodyRef}>
			<div className="message-dogtag">
				<img src={dogtagFirst} alt="" />
				<span>{name}</span>
				<img src={dogtagLast} alt="" />
			</div>
			<div className="message-content">
				<p>{content}</p>
			</div>
		</div>
	)
}

export default Message