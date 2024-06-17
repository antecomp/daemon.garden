type UUID = `${string}-${string}-${string}-${string}`
type condition = `C_${string}`

export interface DialogueFile {
    root: {
        next: string
    }
    [UUID: UUID]: {
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
        //Either we have signals OR a next.
        //Trying to enforce this would be too much of a pain in the ass.

    }
}