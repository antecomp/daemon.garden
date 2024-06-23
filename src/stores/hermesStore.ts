import { HermesStore } from "@/components/Hermes/hermes.types";
import { DialogueFile } from "@/types/RawDialogue.types";
import { create } from "zustand";

async function loadMessageTree(filename: string) {
	try {
		const response = await import(`@/data/messagetrees/${filename}.json`)
		response.default.filename = filename;
		return response.default as DialogueFile;
	} catch (error) {
		console.error(error);
		return null
	}
}

/**
 * This store is used to interface with the Hermes components, reference it's JSDoc for it's use.
 * 
 * In general, the only thing that should be called external to Hermes is initiateHermes. 
 */
const useHermesStore = create<HermesStore>((set, get) => ({
	currentDialogTree: null,
	isActive: false,
	/**
	 * Start a new Hermes instance with the passed dialogue file.
	 * @param filename filename within messagetrees
	 */
	async initiateHermes(filename: string) {

		const {isActive} = get();

		if(isActive) {
			throw new Error("Cannot initiate new hermes as a sequence is already occuring. If you desperately need to override, use dangerouslyIntiateHermes.")
		}

		const loaded = await loadMessageTree(filename);

		set(() => ({
			currentDialogTree: loaded,
			isActive: true
		}))
	},
	async dangerouslyInitiateHermes(filename: string) {
		const loaded = await loadMessageTree(filename);

		set(() => ({
			currentDialogTree: loaded,
			isActive: true
		}))
	},
	closeHermes() {
		console.log("exit trigger")
		set(() => ({
			currentDialogTree: null, // idk if we wanna change this later so we can "resume" chats.
			isActive: false
		}))
	}
}))

export default useHermesStore;