import { useCallback, useContext } from "react"
import { NSNodeProps } from "./NSNode.types"
import { DesktopContext } from "../Util/Desktop/Desktop"
import SimpleWindow from "../Util/Desktop/SimpleWindow"
import useNSTStore from "@/store"
import { coordinatePair } from "@/extra.types"
import { NODE_CONSTS } from "./NSTracer.config"


const NSNode = ({
    id,
    children,
    dx = 1,
    dy = 1,
    parentCoords = { x: 0, y: 0 },
    action,
    actionProps,
    postConnect,
}: NSNodeProps) => {

    const DKT = useContext(DesktopContext);
    const { connectedNodes, addNode, removeNode } = useNSTStore()
    const isNodeExpanded = connectedNodes.includes(id)  

    // Display Stuff //////////////////////////////////////////////
    const coords = {
        x: parentCoords.x + (NODE_CONSTS.offsetMultiplier * dx),
        y: parentCoords.y + (NODE_CONSTS.offsetMultiplier * dy)
    } 
    const linePoints: coordinatePair = { // TODO: make this more robust with the line drawing changing origin to better fit angle.
        x1: parentCoords.x,
        y1: parentCoords.y + (NODE_CONSTS.radius),
        x2: coords.x,
        y2: coords.y
    }
    //////////////////////////////////////////////////////////////

    // Fancy Shit ///////////////////////////////////////////////
    const handleClick = useCallback(() => { // Maybe I should move this method elsewhere so a bunch of the callback stuff isnt mixed with the node render code?
        if(connectedNodes.includes(id)) {
            console.log("close")
            removeNode(id)
        } else {
            addNode(id)
        }
    }, [id, connectedNodes])

    return (
        <>
            {!(id == NODE_CONSTS.rootNodeID) && // without this we'll draw a line from the root to (0,0) by accident.
                <line
                   {...linePoints}
                    strokeWidth={1}
                    stroke="white" // move to css when thats done.
                />
            }
            <g>
                <circle
                    r={NODE_CONSTS.radius}
                    cx={coords.x}
                    cy={coords.y}
                    stroke="white"
                    strokeWidth={1}
                    onClick={handleClick}
                />
            </g>
            {isNodeExpanded && (children ?? []).map((nodeProps) => 
                <NSNode
                    key={nodeProps.id}
                    parentCoords={coords}
                    {...nodeProps}
                />
            )}
        </>
    )

}

export default NSNode