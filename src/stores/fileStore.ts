import { create } from "zustand"
import { StorageValue, persist } from "zustand/middleware"

export interface ThSFile {
	fileID: string
	fileName: string
	content: string // eventuall make point to dynamically loaded file
	isRead: boolean
	isHidden: boolean
}

export interface FilesState {
	files: Map<ThSFile['fileID'], ThSFile>

	addFile: (fileID: string, file: ThSFile) => void

	markFileAsRead: (fileID: string) => void
}

const useFileStore = create<FilesState>()(
	persist(
		(set) => ({
			files: new Map<ThSFile['fileID'], ThSFile>(),
			addFile: (fileID: string, file: ThSFile) => set((prev) => ({files: new Map(prev.files).set(fileID, file)})),
			markFileAsRead: (fileID: string) => set((prev) => {
				if (!prev.files.get(fileID)) throw new Error("Cannot mark file as read as it doesn't exist (fileID not found in Map)")
				return (
					{files: new Map(prev.files).set(fileID, {...prev.files.get(fileID)!, isRead: true} )}
				)
			})
		}),
		{
			name: 'Files-Storage',
			storage: { // Reference https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#how-do-i-use-it-with-map-and-set - Need custom storage operations
				getItem: (name) => {
					const str = localStorage.getItem(name);
					if (!str) return null;
					const { state } = JSON.parse(str);
					return {
					  state: {
						...state,
						files: new Map(state.files),
					  },
					}
				  },

				  setItem: (name, newValue: StorageValue<FilesState>) => {
					// functions cannot be JSON encoded
					const str = JSON.stringify({
					  state: {
						...newValue.state,
						files: Array.from(newValue.state.files.entries()),
					  },
					})
					localStorage.setItem(name, str)
				  },

				  removeItem: (name) => localStorage.removeItem(name),
			}
		}
	)
)

export default useFileStore