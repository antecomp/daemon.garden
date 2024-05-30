import { NodeData } from "@/data/NSMap.types";
import { Point } from "@/extra.types";

/* The actual NSNode component uses the verbatim props kept in NSMap, we just need parentCoords for render.  */
export interface NSNodeProps extends NodeData { 
    parentCoords: Point
} 


// Props required by NSNode-called component to handle the response of a "trigger"/modal popup -> shouldConnect cycle.
// 
export interface NSNodeTriggerProps {
    sendNodeResponse(shouldConnect: boolean): void;
    //actionProps: any
}