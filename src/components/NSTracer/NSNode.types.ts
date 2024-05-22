import { NodeData } from "@/data/NSMap.types";
import { Point } from "@/extra.types";

/* The actual NSNode component uses the verbatim props kept in NSMap, we just need parentCoords for render.  */
export interface NSNodeProps extends NodeData { 
    parentCoords: Point
} 