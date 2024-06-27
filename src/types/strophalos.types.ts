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
}

export interface ContactMap {
	[vlid: VLID]: ContactCardProps
}


export interface StrophalosStore extends ContactMap {
	contacts: ContactMap
	setContact(vlid: VLID, details: Omit<ContactCardProps, 'vlid'>): void // used both to add and wholly modify.
	deleteContact(vlid: VLID): void
	setContactNote(vlid: VLID, note: string): void
	setContactStatus(vlid: VLID, status: status): void
}