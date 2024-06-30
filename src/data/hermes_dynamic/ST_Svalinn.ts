import { NPCQuestion } from "@/types/NPCFlags.types";
import { SvalinnFlags } from "./svalinn.flagtypes";
import useNPCFlagStore from "@/stores/NPCFlagStore";

export function addQuestionForSvalinn<T extends keyof SvalinnFlags['questions']>(category: T, question: NPCQuestion) {
	const {modifyFlag} = useNPCFlagStore.getState()
	modifyFlag("svalinn", (prev) => {
		return {
			...prev,
			questions: {
				...prev.questions,
				[category]: [...prev.questions[category], question]
			}
		}
	})
}

export function removeQuestionForSvalinn<T extends keyof SvalinnFlags['questions']>(category: T, key: NPCQuestion['questionKey']) {
	const {modifyFlag} = useNPCFlagStore.getState()
	modifyFlag("svalinn", (prev) => {
		const updatedQuestionsForCategory = prev.questions[category].filter(q => q.questionKey != key)
		return {
			...prev,
			questions: {
				...prev.questions,
				[category]: updatedQuestionsForCategory
			}
		}
	})
}