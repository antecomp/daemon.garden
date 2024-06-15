import { NoemaMeta } from "@/types/noemata.types"
import { create } from "zustand"
import { StorageValue, persist } from "zustand/middleware"

export interface NoemataState {
	noemata: Map<NoemaMeta['ID'], NoemaMeta>

	addNoema: (fileID: string, file: NoemaMeta) => void

	markNoemaAsSeen: (fileID: string) => void
}

const useNoemataStore = create<NoemataState>()(
	persist(
		(set) => ({
			noemata: new Map<NoemaMeta['ID'], NoemaMeta>(),
			addNoema: (fileID: string, file: NoemaMeta) => set((prev) => ({noemata: new Map(prev.noemata).set(fileID, file)})),
			markNoemaAsSeen: (fileID: string) => set((prev) => {
				if (!prev.noemata.get(fileID)) throw new Error("Cannot mark noema as seen as it doesn't exist (fileID not found in Map)")
				return (
					{noemata: new Map(prev.noemata).set(fileID, {...prev.noemata.get(fileID)!, isRead: true} )}
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