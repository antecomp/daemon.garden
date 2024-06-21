import '@/styles/Hermes/Hermes.css'
import topb from './assets/topb.png'
import midb from './assets/midb.png'
import botb from './assets/botb.png'
import ntwrk from './assets/ntwrk.gif'
import nameplateBorder from './assets/nameplate_border.png'
import useTypewriter from '@/hooks/useTypewriter'
import { useEffect, useRef, useState } from 'react'
import Message from './Message'
import useHermesStore from '@/stores/hermesStore'
import { HermesMessageProps, HermesOption } from './hermes.types'
import { DialogueItem, UUID } from '@/types/Dialogue.types'
import { HERMES_MESSAGE_DELAY } from './Hermes.config'

/**
 * Hermes is the "messenger" application for interacting with NPCs in a non-blocking context (unlike dialogue, which overtakes game flow for it's duration). 
 * It's designed to be used for quick dialogue trees that ideally don't have any major gamestate altering side-effects. For example, this can be used to ask Svalinn (or other NPCs) questions.
 * 
 * Hermes uses the hermesStore zustand store to allow for easy global initialization. Please reference the comments there for more info about conventions and usage.
 * @returns 
 */
const Hermes = () => {

	const {isActive, closeHermes, currentDialogTree} = useHermesStore();

	const [previewText, setPreviewText] = useState('') // Linked with useTypewriter for a preview of the message on choices.
	const [options, setOptions] = useState<HermesOption[]>([]);
	const [messages, setMessages] = useState<HermesMessageProps[]>([])
	const [currentDialogueObject, setCurrentDialogueObject] = useState<DialogueItem>();
	const {displayText} = useTypewriter(previewText, 25, () => {})
	const [canDisconnect, setCanDisconnect] = useState(false);
	// Decorative. Receptiant VLID in footer. Eventually this will probably be linked to the actual NPC for story consistancy.
	const RVLID = useRef(`${Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0')}:${Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0')}`)

	const addMessage = (name: string, content: string, UUID: UUID) => { // should this be memoized?
		setMessages(prev => [...prev, {...{name, content, UUID}}])
	}

 	const handleOptionClick = (option: HermesOption) => {
		addMessage('Eske', option.fullText, `optiontriggerfor-${option.nextUUID}`);
		setPreviewText('');
		setOptions([]);

		// Need to handle showing the response message, since our timer is based on nexts it wont show the "current"
		setTimeout(() => 
		{
			if(!currentDialogTree![option.nextUUID]) {
				console.error(`Notice: This response choice (${option.summaryText}) is not attached to any next dialogue object. 99.99% of the time this is not what you want.`)
				setCanDisconnect(true);
				return;
			}
			setCurrentDialogueObject(currentDialogTree![option.nextUUID])
			const responseMessage = currentDialogTree![option.nextUUID]
			addMessage(responseMessage.name, responseMessage.text.en, option.nextUUID);
		}, HERMES_MESSAGE_DELAY)
	}

	// Powerful function I know. Isolated in-case there's any other cleanup or signals we want to do on disconnect later
	const handleDisconnectClick = () => { 
		if(canDisconnect) {
			closeHermes();
		}
	}

	// Reset when dialogue tree updates (if initialize is called when a sequence is already in-progress.)
	// NOTE: One small bug i've found is if you initiate a new dialogue when the handleOptionClick timeout is ticking, because it's not linked to our useEffect unmount stuff.
	// Im going to ignore it for now because we should be checking for isActive to prevent overriding dialogue anyways BUT - something to keep in mind.
	useEffect(() => {
		setMessages([])
		setOptions([])
		setPreviewText('');
		setCanDisconnect(false);
		if (!currentDialogTree) return;
		const firstMessage = currentDialogTree[currentDialogTree.root.next]
		setCurrentDialogueObject(firstMessage);
		addMessage(firstMessage.name, firstMessage.text.en, (currentDialogTree.root.next))
	}, [currentDialogTree])


	/* 	This is honestly a fairly stupid way of handling this interveneous message sending system, but it works.
		Sending a message triggers a change in currentDialogueObject, which triggers this hook to repeat again with up to date info
		We can't just use setInterval because it would be based on old state data + this effect system easily binds into choice handling too 
		as selecting a choice will also update currentDialogueObject and continue this flow. 
	*/
	useEffect(() => {
		if (!currentDialogTree) return; // Mainly just a gaurd clause for TS to be happy, I doubt we'll hit this unless there's some bad init call / race condition.

		const messageTick = setTimeout(() => {
			if(!currentDialogueObject) return; // Another gaurd clause mainly for TS to be happy, the logic below of actually updating the dialogueObject should handle this check.

			// TODO: Handle Signal Emittance.
			if(currentDialogueObject.signals) {
				console.log("encountered signal", currentDialogueObject.signals)
			}

			/* 	We have 4 possible flows from a single dialogue object for traversing the tree.
				* The dialogue has a next - it naturally goes into another dialogue object
				* The dialogue has choices - wait for player input and continue based on what they pick. 
					(Notice how we dont update currentDialogue here for choices, useEffect will not be re-triggered until option picked.)
				* The dialogue has conditions - branches on predefined checks.
				* The dialogue has none of the above - we've reached the end of the dialogue tree - this is our prompt to "disconnect"
			*/
			if(currentDialogueObject.next) {
				const nextDialogueObj = currentDialogTree[currentDialogueObject.next]
				// Display the next message here because we have easy access to its UUID atm (via currents next).
				addMessage(nextDialogueObj.name, nextDialogueObj.text.en, currentDialogueObject.next);
				setCurrentDialogueObject(nextDialogueObj); // Remember that this will trigger the useEffect to run again; continuing the traversal through the dialogue tree.
			} else if (currentDialogueObject.choices) {
				if(currentDialogueObject.choices.length !== 3) throw new Error(`Incorrect # of choices for chat in "${currentDialogueObject.text}"`);

				// Lazy code but it's fine lol.
				setOptions([
					{
						summaryText: 	currentDialogueObject.choices[0].text.en.split(':')[0],
						fullText: 		currentDialogueObject.choices[0].text.en.split(':')[1],
						nextUUID:		currentDialogueObject.choices[0].next
					},
					{
						summaryText: 	currentDialogueObject.choices[1].text.en.split(':')[0],
						fullText: 		currentDialogueObject.choices[1].text.en.split(':')[1],
						nextUUID:		currentDialogueObject.choices[1].next
					},
					{
						summaryText: 	currentDialogueObject.choices[2].text.en.split(':')[0],
						fullText: 		currentDialogueObject.choices[2].text.en.split(':')[1],
						nextUUID:		currentDialogueObject.choices[2].next
					}
				])
			} else if (currentDialogueObject.conditions) { // TODO
				console.log("Conditions in dialogue hit. This is a TODO and will kill the dialogue for now xddd")
				setCanDisconnect(true);
			} else { // End of dialogue tree
				// Idk if we wanna add some flair to say the NPC "disconnected" or something to better signal this to the player??
				setCanDisconnect(true);
			}


		}, HERMES_MESSAGE_DELAY) /* Theoretically we can have this delay vary for each message, if we want. To make the messaging feel more natural. */


		return () => {clearTimeout(messageTick)} // Unceremoniously murder our message tick if some other trigger resets this component. 


	}, [currentDialogueObject])




	// Hermes handles hiding itself so App can just include it with no weird hoisted logic.
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
			<div className="hermes-footer">
				<img src={ntwrk} alt="" />
				<span>S-VLID:9ae0:ffc1 R-VLID:{RVLID.current}</span>
				<span className={`hermes-disconnect ${canDisconnect? 'can-disconnect' : ''}`} onClick={handleDisconnectClick}>DISCONNECT</span>
			</div>
		</div>
	)
}

export default Hermes;