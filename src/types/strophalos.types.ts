import { VLID } from "@/extra.types";

export type status = "awake" | "DNC" | "asleep"

export interface ContactCardProps {
	name: string;
	profile?: string;
	vlid: VLID;
	homeAddr: string;
	currentAddr: string;
	status: status;
	note?: string;
	hermesGeneratorFilename?: string // generator function that is loaded to initiate hermes with some NPCs (called by Strophalos).
}

export interface ContactMap {
	[contactKey: string]: ContactCardProps // Key should be the VLID for people, some other key for daemons.
}


export interface StrophalosStore {
	contacts: ContactMap
	addContact(contactKey: string, details: ContactCardProps): void // Has checking for if the contact already exists.
	setContact(contactKey: string, details: ContactCardProps): void // wholly sets with no checking if it exists (overwrite)
	deleteContact(contactKey: string): void
	setContactNote(contactKey: string, note: string): void
	setContactStatus(contactKey: string, status: status): void
}