import { DynamicHermesStore } from "@/types/hermes.types";
import { create } from "zustand";

const useDynamicHermesStore = create<DynamicHermesStore>((set, get) => ({
	currentCollection: null,
	isActive: false,
	initiateHermes(collectionGenerator) {
		const {isActive} = get();
		if(isActive) {
			throw new Error ("Cannot initiate Hermes instance as one is already active.")
		}

		const coll = collectionGenerator();

		set(() => ({
			currentCollection: coll,
			isActive: true
		}))
	},
	closeHermes() {
		set(() => ({
			currentCollection: null,
			isActive: false
		}))
	}
}))

export default useDynamicHermesStore;