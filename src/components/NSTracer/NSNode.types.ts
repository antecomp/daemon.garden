import { NodeData } from "@/data/NSMap.types";

export interface NSNodeProps extends NodeData {
    parentCoords: {x: number, y: number}
} 