// Should match whatever folders you have in /data/. 
// This enforcement is to catch typos and prevent the higher-depth mistakes mentioned below.
export type supportedDirectories = "scenes" | "noemata" | "messagetrees"

/**
 * load is a simple helper function to grab data from a file with the path src/data/XXX/Y.ts
 * 
 * Remember the dynamic import globs can only be one level deep. Meaning everything that we load
 * has to be in the base folder data, no deeper or anywhere else. 
 * For example, you cannot do scenes/introscenes/sceneName.ts it all has to be in /scenes/
 * @param path The folder within /data/ to look inside
 * @param fileName The filename, Do not include the .ts extensions.
 * @returns Promise<T> where T should match the item type provided by the files export.
 */
export async function load<T>(path: supportedDirectories, fileName: string): Promise<T> {
	try {
		const response = await import(`@/data/${path}/${fileName}.ts`);
		return response.default;
	} catch (error) {
		throw new Error(`Failed to load file: ${error}`)
	}
}

/**
 * loadX is a simple helper function to grab data from a file with the path src/data/XXX/Y.tsx
 * 
 * It is just like load, but for tsx files.
 * Remember the dynamic import globs can only be one level deep. Meaning everything that we load
 * has to be in the base folder data, no deeper or anywhere else. 
 * For example, you cannot do scenes/introscenes/sceneName.ts it all has to be in /scenes/
 * @param path The folder within /data/ to look inside
 * @param fileName The filename, Do not include the .ts extensions.
 * @returns Promise<T> where T should match the item type provided by the files export.
 */
export async function loadX<T>(path: supportedDirectories, fileName: string): Promise<T> {
	try {
		const response = await import(`@/data/${path}/${fileName}.tsx`);
		return response.default;
	} catch (error) {
		throw new Error(`Failed to load file: ${error}`)
	}
}