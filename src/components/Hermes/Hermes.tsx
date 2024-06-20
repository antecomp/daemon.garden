import '@/styles/Hermes/Hermes.css'
import topb from './assets/topb.png'
import midb from './assets/midb.png'
import botb from './assets/botb.png'
import nameplateBorder from './assets/nameplate_border.png'
import useTypewriter from '@/hooks/useTypewriter'
import { useEffect, useState } from 'react'
import Message from './Message'
import useHermesStore from '@/stores/hermesStore'
import { HermesMessageProps, HermesOption } from './hermes.types'
import { DialogueItem, UUID } from '@/types/Dialogue.types'

const Hermes = () => {

	const {isActive, close, currentDialogTree} = useHermesStore();

	const [previewText, setPreviewText] = useState('')
	const [options, setOptions] = useState<HermesOption[]>([]);

	const [messages, setMessages] = useState<HermesMessageProps[]>([])

	const [currentDialogueObject, setCurrentDialogueObject] = useState<DialogueItem>();

	const addMessage = (name: string, content: string, UUID: UUID) => { // should this be memoized?
		setMessages(prev => [...prev, {...{name, content, UUID}}])
	}

 	const handleOptionClick = (option: HermesOption) => {
		addMessage('Eske', option.fullText, `optiontriggerfor-${option.nextUUID}`);
		setPreviewText('');
		setOptions([]);

		// TODO: Add check for setCurrentDialogueObject(currentDialogTree![option.nextUUID] existing,
		// I.e a choice leads into an end. This should never happen but we'll handle it.

		// Need to handle showing the response message, since our timer is based on nexts it wont show the "current"
		setTimeout(() => 
		{setCurrentDialogueObject(currentDialogTree![option.nextUUID])
		const responseMessage = currentDialogTree![option.nextUUID]
		addMessage(responseMessage.name, responseMessage.text.en, option.nextUUID);}, 1000)
	}

	const {displayText} = useTypewriter(previewText, 25, () => {})


	// Reset when dialogue tree updates
	useEffect(() => {
		setMessages([])
		setOptions([])
		if (!currentDialogTree) return;
		const firstMessage = currentDialogTree[currentDialogTree.root.next as UUID]
		setCurrentDialogueObject(firstMessage);
		addMessage(firstMessage.name, firstMessage.text.en, (currentDialogTree.root.next))
	}, [currentDialogTree])


	// Need to make a new interval on every dialogue
	// Shit to do when loading new DialogueObject
	useEffect(() => {
		if (!currentDialogTree) return;
		let messageTick = setInterval(() => {
			console.log('tick')

			if(!currentDialogueObject) { // I dont think we should ever see this, here just in case.
				clearInterval(messageTick);
				return;
			};

			// Handle signals here?
			if(currentDialogueObject.signals) {
				console.log(currentDialogueObject.signals)
			}

			// TODO: Handle conditions.

			if(currentDialogueObject.next) {
				const nextDialogueObj = currentDialogTree[currentDialogueObject.next]
				addMessage(nextDialogueObj.name, nextDialogueObj.text.en, currentDialogueObject.next)
				setCurrentDialogueObject(nextDialogueObj);
			} else if(currentDialogueObject.choices) {
				console.log("choices time")
				if (currentDialogueObject.choices.length !== 3) throw new Error("Incorrect # of choices for chat");
				setOptions([
					{
						summaryText: currentDialogueObject.choices[0].text.en.split(':')[0],
						fullText: currentDialogueObject.choices[0].text.en.split(':')[1],
						nextUUID: currentDialogueObject.choices[0].next
					},
					{
						summaryText: currentDialogueObject.choices[1].text.en.split(':')[0],
						fullText: currentDialogueObject.choices[1].text.en.split(':')[1],
						nextUUID: currentDialogueObject.choices[1].next
					},
					{
						summaryText: currentDialogueObject.choices[2].text.en.split(':')[0],
						fullText: currentDialogueObject.choices[2].text.en.split(':')[1],
						nextUUID: currentDialogueObject.choices[2].next
					},
				])
				//close();
				clearInterval(messageTick);
				return;
			} else { // End of dialogue tree
				console.log("Hit end of dialogue tree")
				clearInterval(messageTick);
				//close();
			} 


		}, 1000)


		return () => {clearInterval(messageTick)}

	}, [currentDialogueObject])






	if(!isActive || !currentDialogTree) return null;




	return (
		<div className="hermes-container">
			<div className="messages-container">
				<div className="message-spacer-nightmare"></div>
				{messages.map(message => <Message key={message.UUID} {...message}/>)}
			</div>
			<div className={`sender-container ${options.length > 0 ? '' : 'inactive'}`}>
				<div className="text-preview">
					<img src={nameplateBorder} alt="" /> <span className='name'>Eske</span> {displayText}
				</div>
				<div 
					className='topb hermes-resp-container' 
					onMouseEnter={() => setPreviewText(options[0].fullText)}
					onClick={() => handleOptionClick(options[0])}
				>
					<p>{options[0]?.summaryText ?? ''}</p>
					<span></span><img src={topb} alt="" />
				</div>
				<div 
					className='hermes-resp-container' 
					onMouseEnter={() => setPreviewText(options[1].fullText)}
					onClick={() => handleOptionClick(options[1])}
				>
					<p>{options[1]?.summaryText ?? ''}</p>
					<span></span><img src={midb} alt="" />
				</div>
				<div 
					className='hermes-resp-container' 
					onMouseEnter={() => setPreviewText(options[2].fullText)}
					onClick={() => handleOptionClick(options[2])}
				>
					<p>{options[2]?.summaryText ?? ''}</p>
					<span></span><img src={botb} alt="" />
				</div>
			</div>
		</div>
	)
}

export default Hermes;