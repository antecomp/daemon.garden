import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NSMAP_DEFAULTS } from "@/data/defaults/NSMap.defaults";
import { NSTSave } from "../data/NSMap.types";

const useNSTStore = create<NSTSave>()(
    persist(
        (set) => ({
            ...NSMAP_DEFAULTS,
            addNode: (id: string) => set((state) => ({ connectedNodes: [...state.connectedNodes, id] })),
            removeNode: (id: string) => set((state) => ({ connectedNodes: state.connectedNodes.filter(nodeID => nodeID !== id) }))
        }),
        {
            name: 'NSTracer-Storage' // localstorage key.
        }
    )
);

export default useNSTStore;