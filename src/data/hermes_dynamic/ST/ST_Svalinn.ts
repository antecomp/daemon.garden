import { NPCQuestion } from "@/types/NPCFlags.types";
import { SvalinnFlags } from "@/types/npcFlagtypes/svalinn.flagtypes";
import useNPCFlagStore from "@/stores/NPCFlagStore";
import { HermesCollection, HermesNode, HermesOption } from "@/types/hermes.types";
import { pickRandom } from "@/util/pickRandom";
import arrayIntersection from "@/util/arrayIntersection";

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

const getCurrentQuestions = () => {
	return useNPCFlagStore.getState().flags.svalinn.questions;
}

const questionCategories: (keyof SvalinnFlags['questions'])[] = ["how", "who", "what", "why"];

const genSTForSvalinn = () => {

	const questionsAtInit = getCurrentQuestions();


	const svalinnRoot: HermesNode = {
		renderSelf() {
			return {
				name: "Eske",
				message: "Hey"
			}
		},
		getGoto() {
			return "svalinn_prompt"
		}
	}

	const svalinnPrompt: HermesNode = {
		renderSelf() {
			return pickRandom<string>(["What's up?", "Hi", "What do ya need?"])
		},
		getGoto() {
			const opts: HermesOption[] = [
				{
					summaryText: "Hint",
					fullText: "What should we do now?",
					goto: "svalinn_hint"
				},
				{
					summaryText: "Nevermind",
					fullText: "Nevermind, just saying Hi",
					goto: "svalinn_bye"
				},
			]

			if(
				questionsAtInit.how.length > 0 ||
				questionsAtInit.what.length > 0 ||
				questionsAtInit.who.length > 0
			) {
				opts.push(
					{
						summaryText: "Question",
						fullText: "I have a question",
						goto: 'svalinn_question_root'
					},
				)
			}

			return opts;
		}
	}

	const coll = new HermesCollection("Svalinn", svalinnRoot, "ST_Svalinn");

	coll.setNode("svalinn_prompt", svalinnPrompt)

	coll.setNode("svalinn_bye", {
		renderSelf: () => "Hi, I'll leave you to it." // Again, generate some random responses here...
	})

	coll.setNode("svalinn_hint", {
		renderSelf: () => useNPCFlagStore.getState().flags.svalinn.currentHint
	})

	coll.setNode("svalinn_question_root", {
		renderSelf() {
			return pickRandom<string>(["Whatsup", "K, go for it.", "Hmm?"])
		},
		getGoto() {
			
			// Remember we need to filter by questions that exist in the map too...
			const currentQuestions = getCurrentQuestions()
			const routes: HermesOption[] = []

			questionCategories.forEach(category => {
				if(arrayIntersection(currentQuestions[category], questionsAtInit[category]).length > 0) {
					routes.push({
						summaryText: category.replace(/^./, str => str.toUpperCase()),
						fullText: `${category.replace(/^./, str => str.toUpperCase())}...`,
						goto: `sq_${category}`,
						dontShowMessage: true
					})
				}
			})


			if (routes.length == 0) return "svalinn_no_question_fallback" // You should never see this as the prompt root checks before jumping here...
			return routes; 
		}
	})

	const anyQuestionsLeft = (): boolean => {
		let anyQuestionsLeft = false;

		const currentQuestions = getCurrentQuestions();

		questionCategories.forEach(category => {
			if (arrayIntersection(currentQuestions[category], questionsAtInit[category]).length > 0) {
				anyQuestionsLeft = true;
			}
		})

		return anyQuestionsLeft
	}

	coll.setNode("sq_loopback_catch", {
		renderSelf: () => {

			if (anyQuestionsLeft()) return "Any other questions?"

			return "Well, that's all I have to share right now. So ill let you back to it."
		},
		getGoto() {
			if(anyQuestionsLeft()) {
				return [
					{
						summaryText: "Yes",
						fullText: "Yes",
						goto: "svalinn_question_root"
					},
					{
						summaryText: "No",
						fullText: "Nah",
						goto: "svalinn_question_end"
					}
				]
			} else return null;
		}
	})

	coll.setNode("svalinn_question_end", {
		renderSelf: () => "Alright, I'll leave you to it then."
	})

	coll.setNode("svalinn_no_question_fallback", {
		renderSelf: () => "Actually sorry bro I don't think I have anything more to tell you rn."
	})

	// Generate all the nodes for our questions
	questionCategories.forEach(category => {
		coll.setNode(`sq_${category}`, {
			renderSelf: () => null,
			getGoto() {
				const {[category]: current} = getCurrentQuestions()
				const available = arrayIntersection(current, questionsAtInit[category])
				return available.map(q => {
					return {
						summaryText: q.summaryText,
						fullText: q.fullText,
						goto: `${category}_${q.questionKey}`
					}
				})
			}
		})

		questionsAtInit[category].forEach(q => {
			coll.setNode(`${category}_${q.questionKey}`, {
				renderSelf: () => q.answer,
				getGoto: () => {
					// Delete the question once we've navigated away from it.
					removeQuestionForSvalinn(category, q.questionKey)
					return "sq_loopback_catch"
				}
			})
		})
	});


/* 	console.log("Dialogue Tree For Svalinn Generated")
	console.log(coll); */

	return coll;
}

export default genSTForSvalinn;