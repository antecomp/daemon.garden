import { HermesCollection, HermesNode, HermesOption } from "@/types/hermes.types";

const generateSvalinnTree = () => {

	const svalinnRoot: HermesNode = {
		renderSelf() {
			return {
				name: "Eske",
				message: "Hey"
			}
		},
		getGoto() {
			return "svalinn_prompt";
		}
	}
	
	const svalinnPrompt = {
		renderSelf() {return "Whats up bro?"}, // set to randomly pick something to say each time
		getGoto() {
			// Eventually change such that if no available questions, hide the I have a question prompt.
			const svalinnBaseOptions: HermesOption[] = [
				{
					summaryText: "Question",
					fullText: "I have a question",
					goto: 'svalinn_question_root'
				},
				{
					summaryText: "Hint",
					fullText: "What should we do now?",
					goto: "svalinn_hint"
				},
				{
					summaryText: "Nevermind",
					fullText: "Nevermind, just saying hi.",
					goto: "svalinn_bye"
				}
			]

			return svalinnBaseOptions;
		},
	}

	const svalinnTree = new HermesCollection("Svalinn", svalinnRoot);

	svalinnTree.setNode("svalinn_prompt", svalinnPrompt);

	svalinnTree.setNode("svalinn_bye", {
		renderSelf: () => "Hi, I'll leave you to it." // Again, generate some random responses here...
	})

	svalinnTree.setNode("svalinn_hint", {
		renderSelf: () => "What do you mean?", 
		getGoto: () => "svalinn_hint_2"
	})

	svalinnTree.setNode("svalinn_hint_2", {
		renderSelf: () => "The game is not remotely done yet, I can't give you any hints..." // This will eventually be based on some flag for Svalinn.
	})

	svalinnTree.setNode("svalinn_question_root", {
		renderSelf() {
			console.log(this.parent) // Node you cant use arrow syntax for this function because it changes what "this" refers to (I hate JS)
			return "Sorry I can't answer anything yet."
		},
		/* getGoto() {
			// Will be based on flags, basically list every question available in the questions flag, but also make sure that it exists within the collection.
			// !!!! Maybe Hermes should be the one checking for if the question node exists and just skip rendering the ones it cant find lol !!!!
			console.log(this.parent)

		} */
	})

	return svalinnTree;
}

export default generateSvalinnTree;