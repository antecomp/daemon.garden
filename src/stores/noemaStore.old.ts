import defaultNoema from "@/data/defaults/noemata.defaults"
import { NoemaMeta } from "@/types/noemata.types"
import { create } from "zustand"
import { StorageValue, persist } from "zustand/middleware"


export interface NoemataState {
	noemata: Map<NoemaMeta['ID'], NoemaMeta>

	addNoema: (ID: string, file: NoemaMeta) => void

	markNoemaAsSeen: (ID: string) => void
}

const useNoemataStore = create<NoemataState>()(
	persist(
		(set) => ({
			noemata: defaultNoema,
			addNoema: (ID: string, noema: NoemaMeta) => set((prev) => ({noemata: new Map(prev.noemata).set(ID, noema)})),
			markNoemaAsSeen: (ID: string) => set((prev) => {
				if (!prev.noemata.get(ID)) throw new Error("Cannot mark noema as seen as it doesn't exist (ID not found in Map)")
				return (
					{noemata: new Map(prev.noemata).set(ID, {...prev.noemata.get(ID)!, isRead: true} )}
				)
			})
		}),
		{
			name: 'noemata-storage',
			storage: { // Reference https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#how-do-i-use-it-with-map-and-set - Need custom storage operations
				getItem: (name) => {
					const str = localStorage.getItem(name);
					if (!str) return null;
					const { state } = JSON.parse(str);
					return {
					  state: {
						...state,
						noemata: new Map(state.noemata),
					  },
					}
				  },

				  setItem: (name, newValue: StorageValue<NoemataState>) => {
					// functions cannot be JSON encoded
					const str = JSON.stringify({
					  state: {
						...newValue.state,
						noemata: Array.from(newValue.state.noemata.entries()),
					  },
					})
					localStorage.setItem(name, str)
				  },

				  removeItem: (name) => localStorage.removeItem(name),
			}
		}
	)
)

export default useNoemataStore