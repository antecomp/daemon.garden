import { DEFAULT_CONTACT_MAP } from "@/data/defaults/strophalos.defaults";
import { ContactMap, StrophalosStore } from "@/types/strophalos.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Stophalos store is for the NPC "contacts" that provide info about NPCs and the oppurtunity to message some of them.
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
			},
			addContact(contactKey, details) {
				set((prev) => {
					if (prev.contacts[contactKey]) throw new Error (`Contact ${contactKey} already exists.`);
					return {
						contacts: {
							...prev.contacts,
							[contactKey] : details
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