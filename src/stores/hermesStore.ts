import { HermesStore } from "@/components/Hermes/hermes.types";
import { DialogueFile } from "@/types/Dialogue.types";
import { create } from "zustand";

async function loadMessageTree(filename: string) {
	try {
		const response = await import(`@/data/messagetrees/${filename}.json`)
		return response.default as DialogueFile;
	} catch (error) {
		console.error(error);
		return null
	}
}

const useHermesStore = create<HermesStore>((set) => ({
	currentDialogTree: null,
	isActive: false,
	async initiateMessages(filename: string) {

		const loaded = await loadMessageTree(filename);

		set((_prev) => ({
			currentDialogTree: loaded,
			isActive: true
		}))
	},
	close() {
		console.log("exit trigger")
		set((_) => ({
			currentDialogTree: null, // idk if we wanna change this later so we can "resume" chats.
			isActive: false
		}))
	}
}))

export default useHermesStore;