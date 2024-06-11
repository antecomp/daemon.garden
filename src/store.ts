import useFileStore from "./stores/fileStore";
import useNSTStore from "./stores/NSTStore";

//export type GDSlicesCombined = NSTSave & FilesState

/**
 * Reference my rant in store/README.md
 * Combined store for accessing all the game state in one. You will probably
 * never use this now lol
 * I dont know what the point of this is now but it works fine :^)
 */
export const useCombinedGDStore = () => {
    const fileState = useFileStore();
    const NSTState = useNSTStore();

    return {
        ...fileState,
        ...NSTState
    }
}

export default useNSTStore;