import useDynamicHermesStore from "@/stores/dynamicHermesStore"
import { useEffect, useRef, useState } from "react";
import { HermesMessageProps } from "./hermes.types";
import useTypewriter from "@/hooks/useTypewriter";
import { HermesCollection, HermesNode, HermesOption } from "@/types/hermes.types";
import { HERMES_MESSAGE_DELAY } from "./Hermes.config";
import Message from "./Message";
import topb from './assets/topb.png'
import midb from './assets/midb.png'
import botb from './assets/botb.png'
import ntwrk from './assets/ntwrk.gif'
import nameplateBorder from './assets/nameplate_border.png'
import '@/styles/Hermes/Hermes.css'

const generateOpeningMessage = (coll: HermesCollection) => {
	const renderKey = "root-message"
	let name: string = coll.name;
	let content: string = ""
	let nodeRender = coll.getRoot().renderSelf()!
	if(typeof nodeRender == 'string') {
		content = nodeRender
	} else {
		content = nodeRender.message
		name = nodeRender.name
	}

	const rtn = {...{name, content, renderKey}}

	return rtn;
}

const generateMessageFromNode = (node: HermesNode, fallbackName: string) => {
	let name: string = fallbackName
	let content: string = ""
	let nodeRender = node.renderSelf()!
	if(typeof nodeRender == 'string') {
		content = nodeRender
		// name stays on fallback
	} else {
		content = nodeRender.message
		name = nodeRender.name
	}
	return {...{name, content}}
}


const HermesDynamic = () => {
	const {closeHermes, currentCollection: collection} = useDynamicHermesStore();

	const [previewText, setPreviewText] = useState('');
	
	const [messages, setMessages] = useState<HermesMessageProps[]>([
		generateOpeningMessage(collection!)
	])

	const [currentNode, setCurrentNode] = useState(collection!.getRoot());

	const [optionsPage, setOptionsPage] = useState(1)

	const [options, setOptions] = useState<HermesOption[]>([])

	const {displayText} = useTypewriter(previewText, 25, () => {})

	const [canDisconnect, setCanDisconnect] = useState(false);

	// Decorative. Receptiant VLID in footer. Eventually this will probably be linked to the actual NPC for story consistancy.
	const RVLID = useRef(`${Math.floor(Math.random() * 0xFFFFF).toString(16).padStart(5, '0')}:${Math.floor(Math.random() * 0xFFFFF).toString(16).padStart(5, '0')}`)

	const addMessage = ({name, content, renderKeyBase} : {name: string, content: string, renderKeyBase: string}) => {
		const renderKey = renderKeyBase + '-' + messages.length
		setMessages(prev => [...prev, {...{name, content, renderKey}}])
	}

	const handleDisconnectClick = () => {
		if(canDisconnect) {
			closeHermes();
		}
	}

	useEffect(() => {
		if(!collection) return; // Mainly gaurd for TS to be happy. Should never happen.

		const messageTick = setTimeout(() => {
			
			if(!currentNode.getGoto) { // No next, we've hit a leaf.
				setCanDisconnect(true);
				return () => {clearTimeout(messageTick)};
			}

			const next = currentNode.getGoto();

			if(typeof next == 'string') { // Just a direct next key link.
				const nextNode = collection.getNode(next);
				addMessage({...generateMessageFromNode(nextNode, collection.name), renderKeyBase: next})
				setCurrentNode(nextNode);
			} else { // Otherwise we have choices.
				setOptions(next)
			}


		}, HERMES_MESSAGE_DELAY)

		return () => {clearTimeout(messageTick)};

	}, [currentNode])


	const handleOptionClick = (option: HermesOption | undefined) => {

		// TODO "dontShowMessage coording code"

		if (!option) return;

		addMessage({name: 'Eske', content: option.fullText, renderKeyBase: `optiontriggerfor-${option.goto}`})
		setPreviewText('');
		setOptions([]);

		// Need to handle showing the immediate response message, since our timer is based on next and won't show this "current"
		setTimeout(() => {
			if(!collection?.getNode(option.goto)) {
				console.error('Could not locate the node that this option points to. Is it pointing to anything at all?')
				setCanDisconnect(true);
				return;
			}
			setCurrentNode(collection.getNode(option.goto))
			const responseNode = collection.getNode(option.goto)
			addMessage({...generateMessageFromNode(responseNode, collection.name), renderKeyBase: option.goto})
		}, HERMES_MESSAGE_DELAY)
	}


	return (
		<div className="hermes-container">
			<div className="messages-container">
				<div className="message-spacer-nightmare"></div>
				{messages.map(message => <Message key={message.renderKey} {...message} />)}
			</div>
			<div className={`sender-container ${options.length > 0 ? '' : 'inactive'}`}>
				<div className="text-preview">
					<img src={nameplateBorder} alt="" /> <span className='name'>Eske</span> {displayText}
				</div>
				<div
					className='topb hermes-resp-container'
					onMouseEnter={() => setPreviewText(options[0 * optionsPage].fullText)}
					onClick={() => handleOptionClick(options[0 * optionsPage])}
				>
					<p>{options[0 * optionsPage]?.summaryText ?? ''}</p>
					<span></span><img src={topb} alt="" />
				</div>
				<div
					className='hermes-resp-container'
					onMouseEnter={() => setPreviewText(options[1 * optionsPage].fullText)}
					onClick={() => {handleOptionClick(options[1 * optionsPage])}}
				>
					<p>{options[1 * optionsPage]?.summaryText ?? ''}</p>
					<span></span><img src={midb} alt="" />
				</div>
				<div
					className='hermes-resp-container'
					onMouseEnter={() => setPreviewText(options[2 * optionsPage].fullText)}
					onClick={() => handleOptionClick(options[2 * optionsPage])}
				>
					<p>{options[2 * optionsPage]?.summaryText ?? ''}</p>
					<span></span><img src={botb} alt="" />
				</div>
			</div>
			<div className="hermes-footer">
			<img src={ntwrk} alt="" />
				<span>S-VLID:91ae0:ffc13 R-VLID:{RVLID.current}</span>
				<span className={`hermes-disconnect ${canDisconnect ? 'can-disconnect' : ''}`} onClick={handleDisconnectClick}>DISCONNECT</span>
			</div>
		</div>
	)


}

export default HermesDynamic;