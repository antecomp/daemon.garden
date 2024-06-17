import { NoemaData, NoemaMeta } from "@/types/noemata.types";

// Starting files in noemaStore.
const defaultNoema = new Map<NoemaData['ID'], NoemaMeta>()
	.set("demodoc", {
		ID: "demodoc",
		location: "demoDocFile",
		isRead: false,
		virtualFolder: "local"
	})
	.set("kestrel:eject", {
		ID: "eject",
		location: "kestrel-eject",
		isRead: false,
		virtualFolder: "kestrel"
	})

export default defaultNoema;