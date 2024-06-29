export type HermesNodeKey = `${string}_${string}`

export interface HermesOption {
	summaryText: string
	fullText: string
	dontShowMessage?: true // used for coording
	goto: HermesNodeKey
}

export interface HermesNode {
	renderSelf(): null | HermesMessage // null used for coording.
	getGoto?: () => HermesOption[] | HermesNodeKey // if undefined we've hit the end. HermesOption[] for options, or just the key for an automatic flow.
	parent?: HermesCollection
}

export type HermesMessage = {
	name: string,
	message: string
} | string // If just string provided, attach name based on the main person you're talking to.


export class HermesCollection {
	nodes: {
		[nodeKey: HermesNodeKey]: HermesNode
	}
	constructor(baseNode: HermesNode) {
		const rootNode = baseNode
		rootNode.parent = this
		this.nodes = {
			hermes_root: rootNode
		}
	}

	setNode(nodeKey: HermesNodeKey, newNode: HermesNode) {
		this.nodes[nodeKey] = newNode
		this.nodes[nodeKey].parent = this // ProwlerSFX.mp3
		console.log(this)
	}

	getNode(nodeKey: HermesNodeKey) {
		return this.nodes[nodeKey]
	}
}