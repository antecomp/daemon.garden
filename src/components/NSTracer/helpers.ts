import { validActionPropTypes } from "@/data/NSMap.types";
import { Point } from "@/extra.types";
import Modal from "@/components/Util/Modal/Modal";
import TestTrigger from "../TestTrigger/TestTrigger";
import Battle from "../Battle/Battle";

export function findCircleExitPoint(
	circleCenter: Point,
	radius: number,
	dx: number,
	dy: number
) {
	// if going straight down.
	if (dx == 0) {
		return [circleCenter.x, circleCenter.y + radius];
	}

	const m = dy / dx;
	const xSqr = (radius * radius) / (1 + m * m);

	let x = Math.sqrt(xSqr);
	x *= Math.sign(dx); // This decides what intersection we use. I have no idea why this works correctly.
	const y = m * x;

	return [x + circleCenter.x, y + circleCenter.y];
}

/**
 * This function 99.9999999999999999% of the time is gonna be called by NSNode and nowhere else.
 *
 * initiateNodeAction actually triggers the Modal or whatever associated with a node action, and can handle passing the callback
 * hell between Node <-> Node Action Component <-> Connection Callback
 *
 * Note: initiateNode is based on TS's inference/assurance regarding the data associated with each actionType per action.
 * You can referece NSMap.types.ts for a better look of the internals of this, but essentially we're operating on the principle that
 * based on actionType, we choose what interface the rest of the actionProps object is declared by. For example,
 * if actionType = 'dialogue' we need a dialogue file
 * @param actionProps The actionProps associated with an individual node, undefined = autoconnect, otherwise infer action based on actionType.
 * @param nodeResponseCB Response callback for the node action,
 * basically the "shouldConnect" initiator for connecting to a node or not, this is defined in NSNode as 'handleNodeTriggerResponse'.
 * This will often be passed further into the associated component for an action, such as battle, as a callback saying "hey do(nt) connect"
 * based on whatever conditions defined for that component (such as battle victory/loss).
 * @returns void
 */
export function initiateNodeAction(
	actionProps: validActionPropTypes,
	nodeResponseCB: (shouldConnect: boolean) => void
): void {
	if (!actionProps) {
		// autoconnect when props undefined.
		console.log("autoconnect");
		nodeResponseCB(true);
		return;
	}

	// TS infers the interface we're looking at based on actionType,
	// allows us to nicely ensure the right props go to the right modal.
	switch (actionProps.actionType) {
		case "testpopup":
			Modal.open(TestTrigger, {
				actionProps: actionProps,
				sendNodeResponse: nodeResponseCB,
			});
			break;
		case "battle":
			/* console.log("battle trigger");
			nodeResponseCB(true);
			/* todo */
			Modal.open(Battle, {
				filename: 'anthousai',
				closable: false,
				victoryCB: nodeResponseCB
			})
			break;
		case "dialogue":
			console.log("dialoge");
			nodeResponseCB(false);
			/* todo */
			break;
	}
}
