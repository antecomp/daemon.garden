import {create} from "zustand"
import { persist } from "zustand/middleware"
import { NSMAP_DEFAULTS } from "./data/NSMap.defaults"
import { NSTSave } from "./data/NSMap.types";

// Todo, slice this up, with partialize for persisting whats needd.
// Ref: https://docs.pmnd.rs/zustand/guides/slices-pattern
// https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#partialize


const useNSTStore = create<NSTSave>()(
    persist(
        (set) => ({
            ...NSMAP_DEFAULTS,
            addNode: (id: string) => set((state) => ({connectedNodes: [...state.connectedNodes, id]})),
            removeNode: (id: string) => set((state) => ({connectedNodes: state.connectedNodes.filter(nodeID => nodeID !== id)}))
        }),
        {
            name: 'NSTracer-Storage' // localstorage key.
        }
    )
)

export default useNSTStore;