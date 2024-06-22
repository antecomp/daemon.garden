import { status } from "./Strophalos.types"

export function calcStatusFilter(status: status) {
	switch(status){
		case "awake": 	return "none"
		case "asleep":	return "saturate(0.1) brightness(0.5)"
		case "DNC":		return "hue-rotate(284deg) saturate(7.5)"
	}
}