import { DEFAULT_CONTACT_MAP } from "@/data/strophalos.defaults";
import { ContactMap, StrophalosStore } from "@/types/strophalos.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * TODO!! Add property messageFunction?: () => HermesCollection   (undefined means no messages for the NPC, implicitely make offline/DNC). MessageFunction generates the tree and launches Hermes w/ it
 */

const useStophalosStore = create<StrophalosStore>()(
	persist(
		(set) => ({

			contacts: DEFAULT_CONTACT_MAP,

			setContact(contactKey, details) {
				set((prev) => ({
					contacts: {
						...prev.contacts,
						[contactKey]: details
					}
				}))
			},
			deleteContact(contactKey) {
				set((prev) => {
					// Object deconstruc voodoo: https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
					const {[contactKey]: _, ...filteredContacts}: ContactMap = prev.contacts
					return {contacts: filteredContacts};
				})
			},
			setContactNote(contactKey, note) {
				set((prev) => {
					if (!prev.contacts[contactKey]) throw new Error(`Contact ${contactKey} doesn't exist, cannot edit note.`)

					return {
						contacts: {
							...prev.contacts,
							[contactKey]: {
								...prev.contacts[contactKey],
								"note": note
							}
						}
					}
				})
			},
			setContactStatus(contactKey, status) {
				set((prev) => {
					if (!prev.contacts[contactKey]) throw new Error(`Contact ${contactKey} doesn't exist, cannot change status`);

					return {
						contacts: {
							...prev.contacts,
							[contactKey]: {
								...prev.contacts[contactKey],
								"status": status
							}
						}
					}
				})
			}

		}),
		{
			name: 'stophalos-storage'
		}
	)
)

export default useStophalosStore;