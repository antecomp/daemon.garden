import { OmnidisplayFlags } from "@/data/hermes_dynamic/omnidisplay.flagtypes"
import { SvalinnFlags } from "@/data/hermes_dynamic/svalinn.flagtypes"

export interface NPCQuestion {
	questionKey: string
	summaryText: string,
	fullText: string,
	//genAnswer(): string // Remember this is being saved, we can't use strings here. If we need dynamic answers make some hell Markdown.
	answer: string
}

export interface NPCFlagStore {
	flags: { // Add other dynamic NPCs here...
		'svalinn': SvalinnFlags
		'omnidisplay': OmnidisplayFlags
	}

	modifyFlag<T extends keyof NPCFlagStore['flags']>(who: T, modifyCB: (prev: NPCFlagStore['flags'][T]) => NPCFlagStore['flags'][T]):void

}