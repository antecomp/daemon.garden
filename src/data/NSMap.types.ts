export type NodeData = {
    id: string
    // default dx,dy to 0 on undefined?
    dx?: number 
    dy?: number
    action: string
    actionProps?: any // dont keep it as any lol. I just don't know the structure yet.
    postConnect?: Function
    children?: NodeData[]
}