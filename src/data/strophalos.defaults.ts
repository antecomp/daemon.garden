import { ContactMap } from "@/types/strophalos.types";
import USR from '@/assets/sprites/characters/profile/USER.png'

export const DEFAULT_CONTACT_MAP: ContactMap = {
		"fae77:700ab": {
		name: "Svalinn",
		vlid: "fae77:700ab",
		profile: USR,
		homeAddr: "kv-01010",
		currentAddr: "unknown",
		status: "awake",
	},
	"slopa:00000": {
		name: "Omni",
		vlid: "slopa:00000",
		homeAddr: "Sloplands:72",
		currentAddr: "somewhere cool",
		status: "awake",
		note: "OMNI IS HERE"
	}
}