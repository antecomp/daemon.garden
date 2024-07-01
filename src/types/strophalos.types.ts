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
	// Also add an addContact that does checking for if it already exists? set should be used sparingly.
	setContact(contactKey: string, details: ContactCardProps): void // used both to add and wholly modify.
	deleteContact(contactKey: string): void
	setContactNote(contactKey: string, note: string): void
	setContactStatus(contactKey: string, status: status): void
}