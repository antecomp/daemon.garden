export type status = "awake" | "DNC" | "asleep"

export interface ContactCardProps {
	name: string;
	profile?: string;
	VLID: string;
	homeAddr: string;
	currentAddr: string;
	status: status;
}
