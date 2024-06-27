import { DEFAULT_CONTACT_MAP } from "@/data/strophalos.defaults";
import { ContactMap, StrophalosStore } from "@/types/strophalos.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStophalosStore = create<StrophalosStore>()(
	persist(
		(set) => ({

			contacts: DEFAULT_CONTACT_MAP,

			setContact(vlid, details) {
				set((prev) => ({
					contacts: {
						...prev.contacts,
						[vlid]: {
							...prev.contacts[vlid],
							...details,
							'vlid': vlid
						}
					}
				}))
			},
			deleteContact(vlid) {
				set((prev) => {
					// Object deconstruc voodoo: https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
					const {[vlid]: _, ...filteredContacts}: ContactMap = prev.contacts
					return {contacts: filteredContacts};
				})
			},
			setContactNote(vlid, note) {
				set((prev) => {
					if (!prev.contacts[vlid]) throw new Error(`Contact ${vlid} doesn't exist, cannot edit note.`)

					return {
						contacts: {
							...prev.contacts,
							[vlid]: {
								...prev.contacts[vlid],
								"note": note
							}
						}
					}
				})
			},
			setContactStatus(vlid, status) {
				set((prev) => {
					if (!prev.contacts[vlid]) throw new Error(`Contact ${vlid} doesn't exist, cannot change status`);

					return {
						contacts: {
							...prev.contacts,
							[vlid]: {
								...prev.contacts[vlid],
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