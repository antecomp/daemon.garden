import '@/styles/Hermes/Hermes.css'
import topb from './assets/topb.png'
import midb from './assets/midb.png'
import botb from './assets/botb.png'
import nameplateBorder from './assets/nameplate_border.png'
import useTypewriter from '@/hooks/useTypewriter'
import { useCallback, useState } from 'react'
import Message from './Message'

const Hermes = () => {

	const [previewText, setPreviewText] = useState('')
	const [options, setOptions] = useState([
		['first option', 'Preview text for the first option'], 
		['second option', 'Preview text for a different option'], 
		['third option', 'Preview text for the last option']]
	) // eventually change or null to disable one or more in the list.

	const [messages, setMessages] = useState([{sender: 'Example Person', message: 'This is an opening placeholder message'}])

	const addMessage = (sender: string, message: string) => { // should this be memoized?
		setMessages(prev => [...prev, {...{sender, message}}])
	}

	const {displayText} = useTypewriter(previewText, 25, () => {})

	return (
		<div className="hermes-container">
			<div className="messages-container">
				<div className="message-spacer-nightmare"></div>
				{messages.map(message => <Message key={`${message.sender}-${message.message}`} name={message.sender} content={message.message}/>)}

			</div>
			<div className="sender-container">
				<div className="text-preview">
					<img src={nameplateBorder} alt="" /> <span className='name'>Eske</span> {displayText}
				</div>
				<div 
					className='topb hermes-resp-container' 
					onMouseEnter={() => setPreviewText(options[0][1])}
					onClick={() => addMessage('Eske', options[0][1])}
				>
					<p>{options[0][0]}</p><span></span><img src={topb} alt="" />
				</div>
				<div 
					className='hermes-resp-container' 
					onMouseEnter={() => setPreviewText(options[1][1])}
					onClick={() => addMessage('Eske', options[1][1])}
				>
					<p>{options[1][0]}</p><span></span><img src={midb} alt="" />
				</div>
				<div 
					className='hermes-resp-container' 
					onMouseEnter={() => setPreviewText(options[2][1])}
					onClick={() => addMessage('Eske', options[2][1])}
				>
					<p>{options[2][0]}</p><span></span><img src={botb} alt="" />
				</div>
			</div>
		</div>
	)
}

export default Hermes;