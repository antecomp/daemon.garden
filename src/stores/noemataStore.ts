import { DEFAULT_NOEMATA } from "@/data/defaults/noemata.defaults";
import { NoemataState } from "@/types/noema.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNoemaStore = create<NoemataState>()(
    persist(
        (set) => ({
            noemata: DEFAULT_NOEMATA,
            
            addNoema(folder, noemaID, md) {
                set((state) => ({
                    noemata: {
                        ...state.noemata,
                        [folder]: {
                            ...state.noemata[folder],
                            [noemaID]: md
                        }
                    }
                }))
            },

            markNoemaAsSeen(folder, noemaID) {
                set((state) => {
                    if(!state.noemata[folder][noemaID]) throw new Error("slop time")
                    return {
                       noemata: {
                            ...state.noemata,
                            [folder]: {
                                ...state.noemata[folder],
                                [noemaID]: {
                                    ...state.noemata[folder][noemaID],
                                    isRead: true
                                }
                            }
                        }
                    }
                })
            },
        }), 
        {
            name: "noemata-store"
        }
    )
)

export default useNoemaStore;