import { ContactMap } from "@/types/strophalos.types";
import USR from '@/assets/sprites/characters/profile/USER.png'
import friendX from '@/assets/sprites/characters/profile/friendXpfp.png'

export const DEFAULT_CONTACT_MAP: ContactMap = {
		"fae77:700ab": {
		name: "Svalinn",
		vlid: "fae77:700ab",
		profile: USR,
		homeAddr: "kv-01010",
		currentAddr: "unknown",
		status: "awake",
	},
	"00000:00001": {
		name: "Omni",
		profile: friendX,
		vlid: "00000:00001",
		homeAddr: "hjemme:72ff",
		currentAddr: "somewhere cool",
		status: "awake",
		note: "OMNI IS AWAKE"
	}
}