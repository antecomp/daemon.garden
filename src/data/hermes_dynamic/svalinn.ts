/**
 * This is a sample/test dynamic file with some terribly manually inserted nodes.
 */

import useNSTStore from "@/store";
import { HermesCollection, HermesNode, HermesOption } from "@/types/hermes.types";
import { pickRandom } from "@/util/pickRandom";

// Look I understand this system is unideal and kinda annoying in code but I was ripping my hair out
// trying to find a nicer way to do this. Just deal with it.
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
					fullText: "Nevermind, just saying Hi",
					goto: "svalinn_bye"
				},
				{
					summaryText: "Testing",
					fullText: "Let's test some misc shit bro",
					goto: "svalinn_test_base"
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
		renderSelf: () => "The game is not remotely done yet, I can't give you any hints...", // This will eventually be based on some flag for Svalinn.
		getGoto: () => "svalinn_hint_3"
	})

	svalinnTree.setNode("svalinn_hint_3", {
		renderSelf: () => "But this hint system will be based on your game progress, like I'm aware that your connected nodes looks like this...",
		getGoto: () => "svalinn_hint_4"
	})

	svalinnTree.setNode("svalinn_hint_4", {
		renderSelf: () => useNSTStore.getState().connectedNodes.join(' ') // Make sure to call getState AT this point, not at the root. Otherwise the info will be outdated!!
	})

	svalinnTree.setNode("svalinn_question_root", {
		renderSelf() {
			//console.log(this.parent) // Node you cant use arrow syntax for this function because it changes what "this" refers to (I hate JS)
			return pickRandom<string>(["Whatsup", "K, go for it.", "Hmm?"])
		},
		// Will be based on flags, basically list every question available in the questions flag, but also make sure that it exists within the collection.
		getGoto() {
			return [{
				summaryText: "What",
				fullText: "What...",
				goto: "sq_what",
				dontShowMessage: true
			}, {
				summaryText: "Why",
				fullText: "Why...",
				goto: "sq_why",
				dontShowMessage: true
			}]
		}
	})

	svalinnTree.setNode("sq_loopback_catch", {
		renderSelf: () => "Any other questions?",
		getGoto() {
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
		}
	})

	svalinnTree.setNode("svalinn_question_end", {
		renderSelf: () => "Alright, I'll leave you to it then."
	})


	svalinnTree.setNode("sq_what", {
		renderSelf: () => null,
		getGoto() { // This will map over all the "What questions"
			return [
				{
					summaryText: "this",
					fullText: "What is this program?",
					goto: "sa_what_this"
				}, {
					summaryText: "game",
					fullText: "What is this game?",
					goto: "sa_game"
				}
			]
		}
	})

	svalinnTree.setNode("sa_what_this", {
		renderSelf: () => "Hermes is a program for interacting with NPCs in a more natural, out-of-cutscene way. You can use it to ask me questions!",
		getGoto: () => "sq_loopback_catch"
	})

	svalinnTree.setNode("sa_game", {
		renderSelf: () => "Daemon.garden is a passion project game by omnidisplay and moribund :D",
		getGoto: () => "sq_loopback_catch"
	})


	svalinnTree.setNode("sq_why", {
		renderSelf: () => null,
		getGoto() {
			return [
				{
					summaryText: "this",
					fullText: "Why does this program exist?",
					goto: "sa_why_this"
				}, {
					summaryText: "BROKEN",
					fullText: "This option has no path and should cause Hermes to do a disconnect available bail.",
					goto: "BROKEN_LINK"
				}
			]
		}
	})

	svalinnTree.setNode("sa_why_this", {
		renderSelf: () => "Hermes was made to make interacting with the NPCs feel more player-oriented and natural. You're interacting with us, not just playing out a story!",
		getGoto: () => "sq_loopback_catch"
	})

	svalinnTree.setNode("svalinn_test_base", {
		renderSelf: () => "I don't feel like it right now."
	})

	return svalinnTree;
}

export default generateSvalinnTree;