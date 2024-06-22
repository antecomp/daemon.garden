import { DialogueFile, UUID } from "@/types/RawDialogue.types";

export interface HermesStore {
	currentDialogTree: DialogueFile | null
	isActive: boolean
	initiateHermes: (filename: string) => Promise<void>
	dangerouslyInitiateHermes: (filename: string) => Promise<void>
	closeHermes: () => void
}

export interface HermesOption {
	summaryText: string
	fullText: string
	nextUUID: UUID
}

export interface HermesMessageProps {
	name: string
	content: string
	// This is the React key for our mapping through messages, this needs to be updated with some increment in the 
	// case of looping back to the same message UUID (dont just use UUID).
	renderKey: string
}