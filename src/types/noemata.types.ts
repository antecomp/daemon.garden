/**
 * FileMeta is the simple metadata for fileStore / Mnemosyne to track the currently 'downloaded' files.
 */
export interface NoemaMeta {
	ID: string
	location: string // points to the actual file in /data/noemata/
	virtualFolder: string // for the "folder" the noemata resides in mnemosyne.
	isRead: boolean
	//isHidden: boolean
}

/**
 * FileData is the interface for the actual content of an opened file.
 */
export interface NoemaData {
	ID: string // do I really need this? Just inherit ID from NoeMeta call
	content: JSX.Element
}
