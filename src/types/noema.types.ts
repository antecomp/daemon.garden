import { noemaFolders } from "@/components/Mnemosyne/Mnemosyne.config";


export interface NoemaMeta {
    name: string
    location: `${noemaFolders}/${string}` // points to the actual file in /data/noemata/
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

    markNoemaAsSeen: (folder: string, noemaID: string) => void
}