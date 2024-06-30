import { NPCFlagStore } from "@/types/NPCFlags.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNPCFlagStore = create<NPCFlagStore>()(
	persist (
		(set) => ({
			flags: { // Move to defaults later...
				'svalinn': {
					currentHint: "Sorry, none to give until the games done.",
					questions: {
						what: [],
						who: [],
						how: [],
					}
				},
				'omnidisplay': {
					mood: "sloppy"
				}
			},
			modifyFlag(who, modifyCB) {
				set((prev) => {
					const updated = modifyCB(prev.flags[who])
					return {
						flags: {
							...prev.flags,
							[who]: updated
						}
					}
				})
			}
		}), {
			name: "npcflag-store"
		}
	)
)

export default useNPCFlagStore;