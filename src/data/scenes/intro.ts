import { SceneData } from "@/components/OverlayScene/OverlayScene.types"
import { sendMessageToast } from "@/components/Util/Toasts/Toasts"
import { Slide, toast } from "react-toastify"
import SVN from '@/assets/sprites/characters/profile/USER.png'
import disketteIMG from './introAssets/diskette.png'

const connectionNotif = () => {
	toast('SYSTEM: VI-LINK neural connection established.', {transition: Slide})
}

const exampleScene: SceneData[] = [
	{
		text: `"I found a strange cache today."`,
		color: "yellow"
	},
	{
		text: `Svalinn places a small diskette on the table`,
		image: disketteIMG,
		color: "gray",
		style: {fontStyle: "italic"}
	},
	{
		text: `"what's strange about it?"`,
		color: "teal"
	},
	{
		text: `"I looked up the owners VI-LINK address"`,
		color: "yellow"
	},
	{
		text: `"It's still online."`,
		color: "yellow"
	},
	{
		text: `"And it has been for 10 years straight."`,
		color: "yellow"
	},
	{
		text: `"how is that even possible?"`,
		color: "teal"
	},
	{
		text: `"I don't know. Ready to dive in and find out?"`,
		color: "yellow"
	},
	{
		text: `You pull the VI-LINK cable off the table and bring it to your scalp`,
		color: "gray",
		style: {fontStyle: "italic"}
	},
	{
		text: `"I'm never ready."`,
		color: "teal"
	},
	{
		text: `The VI-LINK's magnetic ends pull the cable through your hand.`,
		color: "gray",
		style: {fontStyle: "italic"},
		postEvent: connectionNotif
	},
	{
		text: `You feel the familiar buzz of it's connection, the confused cry of your neurons as the lies start pouring in.`,
		color: "gray",
		style: {fontStyle: "italic"},
		postEvent: () => sendMessageToast({title: "Svalinn", msg: "Welcome to the development zone of daemon.garden :)", img:SVN})
	}
]

export default exampleScene;