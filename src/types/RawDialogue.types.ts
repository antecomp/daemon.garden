export type UUID = `${string}-${string}-${string}-${string}`
type condition = `C_${string}`

export interface DialogueFile {
    filename: string
    root: {
        next: UUID
    }
    [UUID: UUID]: DialogueItem
}

export interface DialogueItem {
    parent: "root" | UUID
        name: string
        character_uuid: string
        text: {
            en: string
        }
        portrait?: string
        choices?: {
           text: {
            en: string
           } 
           next: UUID
           parent: UUID
        }[]
        signals?: {
            parent: UUID
            gameManager: {
                "String": string
            }
        }
        conditions?: {
            parent: UUID
            [someCondition: condition]: {
                value: boolean
                operator: string
                type: string
            }
            next: UUID
        }[]
        next?: UUID
        //Either we have choices OR a next.
        //Trying to enforce this would be too much of a pain in the ass.
}