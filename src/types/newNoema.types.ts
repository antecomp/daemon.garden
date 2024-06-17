export interface NoemaMeta {
    name: string
    location: string // points to the actual file in /data/noemata/
    isRead?: boolean;
}

export interface NoemaData {
    content: JSX.Element
    dimensions?: {
        width: `${number}px`
        height: `${number}px`
    }
}

export interface NoemataState {
    noemata: {
        [folder: string]: {
            [noemaID: string]: NoemaMeta
        }
    }

    addNoema: (folder: string, noemaID: string, md: NoemaMeta) => void

    markNoemataAsSeen: (folder: string, noemaID: string) => void
}