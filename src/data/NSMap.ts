import { Slide, toast } from "react-toastify"
import { NodeData } from "./NSMap.types"
import useNoemataStore from "@/stores/noemaStore.old"

export const root : NodeData = {
	id: "kestrel:home",
	dx: 5,
	dy: 2,
	action: 'autoconnect',
	postConnect: function () {
		console.log("Welcome To Daemonveil. This is the postConnect automated test system.")
	},
	children: [
		{
			id: "kestrel:phone",
			dx: 2,
			dy: -1,
			action: 'battle',
			actionProps: { fileName: 'anthousai' },
			postConnect: function () {
				toast("postConnect trigger test. You connected to kestrel:phone", {transition: Slide})
			}
		},
		{
			id: "kestrel:friends",
			dx: 1,
			dy: 2,
			action: 'battle',
			actionProps: { fileName: 'automata' },
			children: [
				{
					id: "novacene:home",
					dy: 0,
					dx: 2.2,
					action: 'battle',
					actionProps: { fileName: 'anthousai' },
				},
				{
					id: "divi:home",
					dy: 2.5,
					dx: 1.5,
					action: 'battle',
					actionProps: { fileName: 'automata' },
				},
				{
					id: "jill:home",
					dy: 3,
					dx: 0,
					action: 'autoconnect',
				}
			]
		},
		{
			id: "omnidisplay:network",
			dx: -2,
			dy: 3,
			action: 'battle',
			actionProps: { fileName: 'automata' },
			children: [{
				id: "slopzone:network",
				dx: 0,
				dy: 1,
				action: 'autoconnect',
				postConnect: () => {
					useNoemataStore.getState().addNoema('wicked', {
						ID: "wicked",
						location: "wicked",
						virtualFolder: "local",
						isRead: false
					})
				},
				children: [
					{
						id: "the slop module",
						action: 'battle',
						actionProps: { fileName: 'anthousai' },
						dy: -1,
						dx: -2
					},
					{
						id: "the mori zone",
						action: 'dialogue',
						dx: 1,
					}
				]
			}]
		}
	]
}