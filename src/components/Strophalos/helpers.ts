import { ContactStatus } from "@/types/strophalos.types"

export function calcStatusFilter(status: ContactStatus) {
	switch(status){
		case ContactStatus.Awake: 			return "none"
		case ContactStatus.Asleep:			return "saturate(0.1) brightness(0.5)"
		case ContactStatus.DoNotContact:	return "hue-rotate(284deg) saturate(7.5)"
	}
}