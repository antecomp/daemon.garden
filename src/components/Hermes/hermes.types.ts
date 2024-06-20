import { DialogueFile, UUID } from "@/types/Dialogue.types";

export interface HermesStore {
	currentDialogTree: DialogueFile | null
	isActive: boolean
	initiateMessages: (filename: string) => Promise<void>
	close: () => void
}

export interface HermesOption {
	summaryText: string
	fullText: string
	nextUUID: UUID
}

export interface HermesMessageProps {
	name: string
	content: string
	UUID: UUID
}