import useDynamicHermesStore from "@/stores/dynamicHermesStore"
import { useEffect, useRef, useState } from "react";
import { HermesMessageProps } from "@/types/hermes.types";
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
import classNames from "classnames";

// Used to set initial state for our messages array.
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

	return {...{name, content, renderKey}}
}

// Remember renderSelf() either returns a string or {name, message} object
// This parses which one that is and returns the proper params to add a message.
const generateMessageFromNode = (node: HermesNode) => {
	let name: string = node.parent?.name ?? "ANONYMOUS (ERROR)"
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

/**
 * HermesDynamic is a re-write of the original "Hermes" concept. It is initialized in conjunction with calling initiateHermes in the dyanmicHermesStore.
 * This Hermes takes a custom defined dialogue "collection" (HermesCollection in types/hermes.types.ts) that is generated by some generator callback given to initiateHermes.
 * 
 * More broadly, this is the "chat" application for interacting with NPCs in a non-gameflow-blocking and "live" way; it's opened on the side and can be based on current game state to direct dialogue flow. 
 * @returns 
 */
const HermesDynamic = () => {
	const {closeHermes, currentCollection: collection} = useDynamicHermesStore();

	const [previewText, setPreviewText] = useState('');
	
	const [messages, setMessages] = useState<HermesMessageProps[]>([
		generateOpeningMessage(collection!)
	])

	const [currentNode, setCurrentNode] = useState(collection!.getRoot());

	const [options, setOptions] = useState<HermesOption[]>([])

	const [optionsPage, setOptionsPage] = useState(0)	

	const optionsOffset = optionsPage * 3;

	const numPages = (() => {
		let rtn = Math.floor(options.length /3)
		const leftovers = (options.length % 3) > 0
		rtn = rtn + (leftovers ? 1 : 0)
		return rtn
	})()

	const {displayText} = useTypewriter(previewText, 25, () => {})

	const [canDisconnect, setCanDisconnect] = useState(false);

	// Decorative. Receptiant VLID in footer. Eventually this will probably be linked to the actual NPC for story consistancy.
	const RVLID = useRef(`${Math.floor(Math.random() * 0xFFFFF).toString(16).padStart(5, '0')}:${Math.floor(Math.random() * 0xFFFFF).toString(16).padStart(5, '0')}`)

	const addMessage = ({name, content, renderKeyBase} : {name: string, content: string, renderKeyBase: string}) => {
		const renderKey = renderKeyBase + '-' + messages.length // Attach message-length to enforce uniqueness on message loopbacks by attaching an index/iterating number.
		setMessages(prev => [...prev, {...{name, content, renderKey}}])
	}

	/**
	 * useEffecting on the current dialogue node to run stuff to grab the next dialogue node and perform the needed actions is the most elegant
	 * way I could find for something intervenous/timeout'd like this.
	 * 
	 * Note: We can't just use setInterval because it would be based on old state data + this effect system easily binds into choice handling too 
	 * as selecting a choice will also update currentDialogueObject and continue this flow. 
	 */
	useEffect(() => {
		if(!collection) return; // Mainly gaurd for TS to be happy. Should never happen.

		const next = currentNode.getGoto ? currentNode.getGoto() : null;

		if(!next) {
			setCanDisconnect(true);
			return;
		}

		const displayNextMessage = () => {
			if(typeof next == 'string') { // Just a direct next key link.
				const nextNode = collection.getNode(next);
				addMessage({...generateMessageFromNode(nextNode), renderKeyBase: next})
				setCurrentNode(nextNode);
			} else { // Otherwise we have choices.
				setOptions(next)
			}
		}

		if(currentNode.renderSelf() == null) { // Remember, null is used when coording.
			displayNextMessage() // Immediately advance it with no timeout when coording.
			return;
		}
		
		// TODO: In the future we may want to randomize the delay some to make it feel more natural (maybe based on # characters??)
		const messageTick = setTimeout(displayNextMessage, HERMES_MESSAGE_DELAY) 

		return () => {clearTimeout(messageTick)};

	}, [currentNode])


	const handleOptionClick = (option: HermesOption | undefined) => {

		if (!option) return;

		setPreviewText('');
		setOptions([]);
		setOptionsPage(0);

		if(option.dontShowMessage) {
			if(!collection?.getNode(option.goto)) {
				console.error('Could not locate the node that this option points to. Is it pointing to anything at all?')
				setCanDisconnect(true);
				return;
			}

			setCurrentNode(collection.getNode(option.goto))
			// Dont display response.
			return;
		}

		addMessage({name: 'Eske', content: option.fullText, renderKeyBase: `optiontriggerfor-${option.goto}`})

		// Need to handle showing the immediate response message, since our timer is based on next and won't show this "current"
		setTimeout(() => {
			if(!collection?.getNode(option.goto)) {
				console.error('Could not locate the node that this option points to. Is it pointing to anything at all?')
				setCanDisconnect(true);
				return;
			}
			setCurrentNode(collection.getNode(option.goto))
			const responseNode = collection.getNode(option.goto)
			addMessage({...generateMessageFromNode(responseNode), renderKeyBase: option.goto})
		}, HERMES_MESSAGE_DELAY)
	}

	const generatePages = () => {
		const rtn: JSX.Element[] = []

		for(let i = 0; i < numPages; i++) {
			rtn.push(
				<a key={`hermes-page-${i}`} className={"hermes-page-opt " + ((optionsPage == i)? 'hpo-active' : '')} onClick={() => setOptionsPage(i)}></a>
			)
		}

		return rtn;
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
					className={'hermes-resp-container ' + ((options[optionsOffset] ? '' : 'inactive'))}
					onMouseEnter={() => setPreviewText(options[0 + optionsOffset]?.fullText ?? '')}
					onClick={() => handleOptionClick(options[0 + optionsOffset])}
				>
					<p>{options[0 + optionsOffset]?.summaryText ?? ''}</p>
					<span></span><img src={topb} alt="" />
				</div>
				<div
					className={'hermes-resp-container ' + ((options[1 + optionsOffset] ? '' : 'inactive'))}
					onMouseEnter={() => setPreviewText(options[1 + optionsOffset]?.fullText ?? '')}
					onClick={() => {handleOptionClick(options[1 + optionsOffset])}}
				>
					<p>{options[1 + optionsOffset]?.summaryText ?? ''}</p>
					<span></span><img src={midb} alt="" />
				</div>
				<div
					className={'hermes-resp-container ' + ((options[2 + optionsOffset] ? '' : 'inactive'))}
					onMouseEnter={() => setPreviewText(options[2 + optionsOffset]?.fullText ?? '')}
					onClick={() => handleOptionClick(options[2 + optionsOffset])}
				>
					<p>{options[2 + optionsOffset]?.summaryText ?? ''}</p>
					<span></span><img src={botb} alt="" />
				</div>
			</div>
			<div className="hermes-footer">
			<img src={ntwrk} alt="" />
				<span>S-VLID:91ae0:ffc13 R-VLID:{RVLID.current}</span>
				<span className={`hermes-disconnect ${canDisconnect ? 'can-disconnect' : ''}`} onClick={() => {canDisconnect && closeHermes()}}>DISCONNECT</span>
			</div>
			{	(options.length > 3) &&
				<div className={classNames({"hermes-pages": true, "hp-first": (optionsPage == 0), "hp-last": (optionsPage == numPages - 1)})}>
					{generatePages()}
				</div>
			}
		</div>
	)
}

export default HermesDynamic;