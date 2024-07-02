import { NPCQuestion } from "@/types/NPCFlags.types";
import { SvalinnFlags } from "../../../types/npcFlagtypes/svalinn.flagtypes";

const SVALINN_DEFAULT_HOW: NPCQuestion[] = [
		{
			questionKey: 'howToStart',
			summaryText: 'How to start the game?',
			fullText: 'Could you please explain how to start the game?',
			answer: 'To start the game, you need to click on the "Start" button on the main menu.'
		},
		{
			questionKey: 'howToSave',
			summaryText: 'How to save progress?',
			fullText: 'Can you tell me how to save my progress in the game?',
			answer: 'You can save your progress by going to the "Save" menu and selecting "Save Game".'
		},
		{
			questionKey: 'howToLoad',
			summaryText: 'How to load a saved game?',
			fullText: 'What is the procedure to load a saved game?',
			answer: 'To load a saved game, navigate to the "Load" menu and select the game you want to load.'
		},
		{
			questionKey: 'howToQuit',
			summaryText: 'How to quit the game?',
			fullText: 'What is the proper way to exit the game?',
			answer: 'To quit the game, you can go to the main menu and select "Quit" or press Alt+F4.'
		},
		{
			questionKey: 'howToPause',
			summaryText: 'How to pause the game?',
			fullText: 'Is there a way to pause the game?',
			answer: 'You can pause the game by pressing the "Pause" button or by pressing the "P" key on your keyboard.'
		}
]

const SVALINN_DEFAULT_WHAT: NPCQuestion[] = [
	{
		questionKey: 'whatIsGame',
		summaryText: 'What is this game about?',
		fullText: 'Can you describe what this game is about?',
		answer: 'This game is a role-playing adventure where you explore different worlds and complete quests.'
	},
	{
		questionKey: 'whatAreControls',
		summaryText: 'What are the controls?',
		fullText: 'What are the basic controls for this game?',
		answer: 'The basic controls are W, A, S, D for movement, space for jump, and mouse for looking around.'
	},
	{
		questionKey: 'whatIsObjective',
		summaryText: 'What is the main objective?',
		fullText: 'Can you tell me what the main objective of the game is?',
		answer: 'The main objective is to complete the main storyline quests and save the kingdom from impending doom.'
	},
	{
		questionKey: 'whatAreItems',
		summaryText: 'What are the available items?',
		fullText: 'Can you list the types of items available in the game?',
		answer: 'The game features a variety of items including weapons, armor, potions, and magical artifacts.'
	},
	{
		questionKey: 'whatIsCurrency',
		summaryText: 'What is the in-game currency?',
		fullText: 'What type of currency is used in the game?',
		answer: 'The in-game currency is gold coins, which can be earned by completing quests and defeating enemies.'
	}
];

const SVALINN_DEFAULT_WHO: NPCQuestion[] = [
	{
		questionKey: 'whoIsHero',
		summaryText: 'Who is the main hero?',
		fullText: 'Can you tell me who the main hero of the game is?',
		answer: 'The main hero of the game is a brave warrior named Arin, destined to save the kingdom.'
	},
	{
		questionKey: 'whoIsVillain',
		summaryText: 'Who is the main villain?',
		fullText: 'Who is the primary antagonist that the hero must face?',
		answer: 'The main villain is the dark sorcerer Zoltar, who has plunged the kingdom into chaos.'
	},
	{
		questionKey: 'whoAreCompanions',
		summaryText: 'Who are the hero\'s companions?',
		fullText: 'Who will accompany the hero on their journey?',
		answer: 'The hero is accompanied by a skilled archer named Lyria and a wise mage named Eldrin.'
	},
	{
		questionKey: 'whoIsMentor',
		summaryText: 'Who is the hero\'s mentor?',
		fullText: 'Can you tell me who guides the hero?',
		answer: 'The hero\'s mentor is an old knight named Sir Galahad, who provides wisdom and training.'
	},
	{
		questionKey: 'whoAreEnemies',
		summaryText: 'Who are the common enemies?',
		fullText: 'Who will the hero frequently encounter as enemies?',
		answer: 'The hero will encounter various enemies, including goblins, bandits, and dark wizards.'
	}
]


const SVALINN_DEFAULT_WHY: NPCQuestion[] = [
	{
		questionKey: 'whySaveKingdom',
		summaryText: 'Why save the kingdom?',
		fullText: 'Can you explain why the kingdom must be saved?',
		answer: 'The kingdom must be saved to prevent the dark sorcerer Zoltar from plunging the world into eternal darkness.'
	},
	{
		questionKey: 'whyHeroChosen',
		summaryText: 'Why was the hero chosen?',
		fullText: 'Why was the main hero chosen for this quest?',
		answer: 'The hero was chosen because of their unique lineage and inherent bravery, making them the only one capable of facing Zoltar.'
	},
	{
		questionKey: 'whyEnemiesAttack',
		summaryText: 'Why do enemies attack?',
		fullText: 'Why are the enemies attacking the hero and the kingdom?',
		answer: 'The enemies attack under the command of Zoltar, who seeks to weaken the kingdom\'s defenses and spread fear.'
	},
	{
		questionKey: 'whyItemsImportant',
		summaryText: 'Item importance?',
		fullText: 'Why are the items found during the journey important?',
		answer: 'The items are important because they grant the hero special abilities and powers needed to overcome challenges.'
	},
	{
		questionKey: 'whyMentorHelps',
		summaryText: 'Why does the mentor help',
		fullText: 'What motivates the mentor to assist the hero?',
		answer: 'The mentor helps the hero out of a sense of duty and a desire to see the kingdom restored to peace.'
	},
	{
		questionKey: 'whyNeedAllies',
		summaryText: 'Why does the hero need allies?',
		fullText: 'Why is it important for the hero to have allies?',
		answer: 'Allies are crucial for providing support, different skills, and moral strength to the hero during their quest.'
	},
	{
		questionKey: 'whyAncientArtifacts',
		summaryText: 'Why seek ancient artifacts?',
		fullText: 'Why must the hero seek out ancient artifacts?',
		answer: 'Ancient artifacts hold powerful magic that can help defeat Zoltar and restore peace to the kingdom.'
	},
	{
		questionKey: 'whyTrustProphecy',
		summaryText: 'Why trust the prophecy?',
		fullText: 'Why does the hero believe in the prophecy?',
		answer: 'The prophecy has been passed down for generations and has accurately predicted past events, making it a guiding beacon for the hero.'
	},
	{
		questionKey: 'whyExploreDungeons',
		summaryText: 'Why explore dungeons?',
		fullText: 'Why must the hero venture into dangerous dungeons?',
		answer: 'Exploring dungeons is essential to find hidden treasures, gain experience, and uncover secrets that are vital for the quest.'
	}
]

export const SVALINN_DEFAULT_QUESTIONS: SvalinnFlags['questions'] = {
	how: SVALINN_DEFAULT_HOW,
	what: SVALINN_DEFAULT_WHAT,
	who: SVALINN_DEFAULT_WHO,
	why: SVALINN_DEFAULT_WHY
}