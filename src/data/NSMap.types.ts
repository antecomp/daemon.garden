export interface NodeData {
	/* interface for the NSMap in data, ensure node data integrity for render. */
	id: string;
	// default dx,dy to 0 on undefined?
	dx?: number;
	dy?: number;
	actionProps?: validActionPropTypes;
	postConnect?: Function;
	children?: NodeData[];
}

// TODO, maybe change this to a set to enforce uniqueness?
export interface NSTSave {
	connectedNodes: string[];
	addNode: Function;
	removeNode: Function;
}

// Undefined in this case refers to an autoconnect case.
export type validActionPropTypes =
	| undefined
	| battleActionProps
	| testActionProps
	| dialogueActionProps;

export interface battleActionProps {
	actionType: "battle";
	filename: string;
}

export interface testActionProps {
	actionType: "testpopup";
	text: string;
	connectText: string;
	rejectText: string;
	onConnectText: string;
	onRejectText: string;
}

export interface dialogueActionProps {
	actionType: "dialogue";
	filename: string;
}
