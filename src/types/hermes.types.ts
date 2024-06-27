export type HermesNodeKey = `${string}-${string}`;

export type HermesChoicesMap = {
	summaryText: string;
	fullText: string;
	goesTo: HermesNodeKey;
}[];

export interface HermesNode {
	renderSelf(): JSX.Element; // take no props, all global state based?
	actions: { (): void }[]; // array of functions to run when this node is hit, often may include killingPaths.
	// disabled?
	// hold own key?
	flow: "leaf" | HermesNodeKey | HermesChoicesMap; // next eller choices
}

export interface HermesCollection {
	originKey: HermesNodeKey;
	[nodeKey: HermesNodeKey]: HermesNode;
}

// If orphan cleanup is automated, a method like addNode by itself would be very risky.
export interface HermesMethods {
	/**
	 * Attaches a node as the "next" or direct path from an existing node.
	 * @param who - the actual hermes convo individual you want to modify the tree of. (some easy identifier?)
	 * @param targetKey key to attach to
	 * @param key key to save the hermes node by directly in the map.
	 * @param node node data
	 * @param overwrite this function will throw an error if you try to attach a "next" node to something that already
	 * has a next or options, you should only attach to leaves nicely. Explicitely acknowledge an override otherwise.
	 */
	attachNewNodeAsNext({
		who,
		targetKey, 
		key,
		node,
		overwrite
	}: {
		who: string
		targetKey: HermesNodeKey,
		key: HermesNodeKey,
		node: HermesNode,
		overwrite: boolean
	}): void;

	
	attachNewNodeAsOption({
		who,
		targetKey,
		key,
		node,
		summaryText,
		fullText,
		overwrite,
	}: {
		who: string
		targetKey: HermesNodeKey;
		key: HermesNodeKey;
		node: HermesNode;
		summaryText: string;
		fullText: string;
		overwrite: boolean;
	}): void;


	editNode({
		who,
		targetKey,
		modifier // Callback thats given the previous node, returns whatever updated node you want.
	}: {
		who: string
		targetKey: string
		modifier(prev: HermesNode): HermesNode
	}): void


	killPath(who: string, targetKey: HermesNodeKey): void


	removeOrphans(): void

}
