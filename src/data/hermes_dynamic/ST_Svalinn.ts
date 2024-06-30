import { NPCQuestion } from "@/types/NPCFlags.types";
import { SvalinnFlags } from "./svalinn.flagtypes";
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


	const coll = new HermesCollection("Svalinn", svalinnRoot);

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
			if(arrayIntersection(currentQuestions.how, questionsAtInit.how).length > 0) {
				routes.push({
					summaryText: "How",
					fullText: "How...",
					goto: "sq_how",
					dontShowMessage: true
				})
			}
			if(arrayIntersection(currentQuestions.what, questionsAtInit.what).length > 0) {
				routes.push({
					summaryText: "What",
					fullText: "What...",
					goto: "sq_what",
					dontShowMessage: true
				})
			}
			if(arrayIntersection(currentQuestions.who, questionsAtInit.who).length > 0) {
				routes.push({
					summaryText: "Who",
					fullText: "Who...",
					goto: "sq_who",
					dontShowMessage: true
				})
			}
			if (routes.length == 0) return "svalinn_no_question_fallback" // You should never see this as the prompt root checks before jumping here...
			return routes; 
		}
	})

	// TODO: make this conditionally render different if no more questions left.

	const anyQuestionsLeft = (): boolean => {
		let anyQuestionsLeft = false;

		const questionCategories: (keyof SvalinnFlags['questions'])[] = ["how", "who", "what"];
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


	// Likely move this to a standard internal helper function, im literally copy pasting here for these 3...
	coll.setNode("sq_how", {
		renderSelf: () => null,
		getGoto() {
			const {how: currentHow} = getCurrentQuestions()
			const availableHow = arrayIntersection(currentHow, questionsAtInit.how)
			return availableHow.map(q => {
				return {
					summaryText: q.summaryText,
					fullText: q.fullText,
					goto: `how_${q.questionKey}`
				}
			});
		}
	})

	coll.setNode("sq_who", {
		renderSelf: () => null,
		getGoto() {
			const {who: currentWho} = getCurrentQuestions()
			const availableWho = arrayIntersection(currentWho, questionsAtInit.who)
			return availableWho.map(q => {
				return {
					summaryText: q.summaryText,
					fullText: q.fullText,
					goto: `who_${q.questionKey}`
				}
			});
		}
	})

	coll.setNode("sq_what", {
		renderSelf: () => null,
		getGoto() {
			const {what: currentWhat} = getCurrentQuestions()
			const availableWhat = arrayIntersection(currentWhat, questionsAtInit.what)
			return availableWhat.map(q => { 
				return {
					summaryText: q.summaryText,
					fullText: q.fullText,
					goto: `what_${q.questionKey}`
				}
			});
		}
	})

	// Generate all the nodes for our questions
	const questionCategories: (keyof SvalinnFlags['questions'])[] = ["how", "who", "what"];
	questionCategories.forEach(category => {
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


	console.log("Dialogue Tree For Svalinn Generated")
	console.log(coll);

	return coll;
}

export default genSTForSvalinn;