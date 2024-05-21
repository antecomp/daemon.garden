import { useCallback, useContext } from "react"
import { NSNodeProps } from "./NSNode.types"
import { DesktopContext } from "../Util/Desktop/Desktop"
import SimpleWindow from "../Util/Desktop/SimpleWindow"
import useNSTStore from "@/store"
import { coordinatePair } from "@/extra.types"
import { NODE_CONSTS } from "./NSTracer.config"
import classNames from "classnames"
import { findCircleExitPoint } from "./helpers"

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
    const expandedLeaf = isNodeExpanded && (children == null);

    // Display Stuff //////////////////////////////////////////////
    const coords = {
        x: parentCoords.x + (NODE_CONSTS.offsetMultiplier * dx),
        y: parentCoords.y + (NODE_CONSTS.offsetMultiplier * dy)
    }

    const linePoints: coordinatePair = { // TODO: make this more robust with the line drawing changing origin to better fit angle.
        x1: findCircleExitPoint({...parentCoords}, NODE_CONSTS.radius, dx, dy)[0],
        y1: findCircleExitPoint({...parentCoords}, NODE_CONSTS.radius, dx, dy)[1],
        x2: coords.x,
        y2: coords.y
    }

    const nodeClass = classNames({
        'NST-node': true,
        'node-visited': isNodeExpanded,
        'node-visited-leaf': expandedLeaf
    })
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
                    className={nodeClass}
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
                    className={nodeClass}
                />
                {expandedLeaf && <text className="exlText" x={coords.x} y={coords.y + NODE_CONSTS.radius + 10} textAnchor="middle">NO ROUTE</text>}
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