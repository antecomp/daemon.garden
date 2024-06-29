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
	parent?: HermesCollection // In case any of the rendering conditionals are based on what nodes currently exist in the dialogue.
}

export type HermesMessage = {
	name: string,
	message: string
} | string // If just string provided, attach name based on the main person you're talking to.


export class HermesCollection {

	name: string

	nodes: {
		root: HermesNode
		[nodeKey: HermesNodeKey]: HermesNode
	}
	constructor(name: string, baseNode: HermesNode) { // We might wanna change this to simply take a "nodes" object so we can initialize with more info straight-up. Reduce setNodes.
		this.name = name;
		const rootNode = baseNode
		rootNode.parent = this
		this.nodes = {
			root: rootNode
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

	getRoot() {
		return this.nodes['root']
	}
}

export interface DynamicHermesStore {
	currentCollection: HermesCollection | null
	isActive: boolean
	initiateHermes(collectionGenerator: () => HermesCollection): void
	closeHermes(): void
}