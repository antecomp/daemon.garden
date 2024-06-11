import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface FilesState {
	files: {
		fileID: string
		fileName: string
		content: JSX.Element
		read: boolean
	}[]

	addFile: Function // change to a better type later or if needed.
}

const useFileStore = create<FilesState>()(
	persist(
		(set) => ({
			files: [],
			addFile: (file: FilesState['files']['0']) => set((state) => ({files: [...state.files, file]}))
		}),
		{
			name: 'Files-Storage'
		}
	)
)

export default useFileStore