export default function arrayIntersection<T>(a: T[], b: T[]) { // Note: O(n^2)
	return a.filter(element => b.includes(element));
}