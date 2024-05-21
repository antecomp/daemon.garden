export interface NodeData { /* interface for the NSMap in data, ensure node data integrity for render. */
    id: string
    // default dx,dy to 0 on undefined?
    dx?: number 
    dy?: number
    action: "battle" | "autoconnect" | "dialogue"
    actionProps?: any // dont keep it as any lol. I just don't know the structure yet.
    postConnect?: Function
    children?: NodeData[]
}

// TODO, maybe change this to a set to enforce uniqueness?
export interface NSTSave {
    connectedNodes: string[]
    addNode: Function
    removeNode: Function
}