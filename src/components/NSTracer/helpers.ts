import { Point } from "@/extra.types";

export function findCircleExitPoint(circleCenter: Point, radius: number, dx: number, dy:number) {

	// if going straight down.
	if (dx == 0 ) {
		return [circleCenter.x, circleCenter.y + radius]
	}

	const m = dy / dx

	const xSqr = radius * radius / (1 + m * m)


		let x = Math.sqrt(xSqr);
		x *= (Math.sign(dx)); // This decides what intersection we use. I have no idea why this works correctly.
		const y = m * x;

		return [x + circleCenter.x, y + circleCenter.y]


}