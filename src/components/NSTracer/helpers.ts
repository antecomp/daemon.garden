export function findCircleExitPoint(circleCenter: {x: number, y: number}, radius: number, dx: number, dy:number) {

	// if going straight down.
	if (dx == 0 ) {
		return [circleCenter.x, circleCenter.y + radius]
	}

	let m = dy / dx

	let xSqr = radius * radius / (1 + m * m)


		let x = Math.sqrt(xSqr);
		// decide which intersection point to grab based on slope direction
		x *= (m < 0) ? -1 : 1;

		let y = m * x;

		return [x + circleCenter.x, y + circleCenter.y]


}