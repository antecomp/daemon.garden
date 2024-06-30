import { NPCQuestion } from "@/types/NPCFlags.types";


export interface SvalinnFlags {
	currentHint: string, // Maybe make more robust in the future where we have a stack of tasks that svalinn can go through instead. (Would this be stateful or just gen'd from other gameState??)
	questions: {
		what: NPCQuestion[]
		who: NPCQuestion[]
		how: NPCQuestion[]
	}
}