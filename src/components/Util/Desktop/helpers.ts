export function getNextMapKey(map: Map<string, any>, currentKey: string): string | undefined {
	const entries = Array.from(map.entries());
	const currentIndex = entries.findIndex(([key]) => key === currentKey);

	if(currentIndex === -1) return undefined; // No match for current.

	const nextIndex = (currentIndex + 1) % entries.length

	return entries[nextIndex][0];
}