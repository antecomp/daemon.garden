import { NodeData } from "@/data/NSMap.types";

/* The actual NSNode component uses the verbatim props kept in NSMap, we just need parentCoords for render.  */
export interface NSNodeProps extends NodeData { 
    parentCoords: {x: number, y: number}
} 