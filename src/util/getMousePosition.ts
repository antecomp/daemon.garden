export interface MousePosition {
	x: number;
	y: number;
}

let currentMousePosition: MousePosition = { x: 0, y: 0 };

function updateMousePosition(event: MouseEvent): void {
	currentMousePosition = {
		x: event.clientX,
		y: event.clientY,
	};
}

// Add the event listener only once
window.addEventListener('mousemove', updateMousePosition);

export function getMousePosition(): MousePosition {
	return currentMousePosition;
}