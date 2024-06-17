import { NoemataState } from "@/types/noema.types";

export const DEFAULT_NOEMATA: NoemataState['noemata'] = {
	"local": {
		"demodoc": {
			name: "demodoc",
			location: "local-demodoc"
		}
	},
	"kestrel": {
		"ejectlog": {
			name: "EJECT_LOG",
			location: "kestrel-eject"
		}
	}
}