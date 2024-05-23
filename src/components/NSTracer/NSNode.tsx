import { useCallback, useContext } from "react"
import { NSNodeProps } from "./NSNode.types"
import useNSTStore from "@/store"
import { coordinatePair } from "@/extra.types"
import { NODE_CONSTS } from "./NSTracer.config"
import classNames from "classnames"
import { findCircleExitPoint } from "./helpers"
import { NSTracerContext } from "./NSTracer"

/** 
* Individually rendered "Node" or connection location for the current NSTracer map. 
* @component
* @param (NSNodeProps) props - Node props are passed recursively to search through the entire map file and render nodes. If passing to the root node, just spreadOp the whole map file and set parentCoords as the starting coordinates for the root node
*/

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

    const NSTC = useContext(NSTracerContext)
    const { connectedNodes, addNode, removeNode } = useNSTStore()
    const isNodeExpanded = connectedNodes.includes(id)
    const expandedLeaf = isNodeExpanded && (children == null);

    // Display Stuff //////////////////////////////////////////////
    const coords = {
        x: parentCoords.x + (NODE_CONSTS.offsetMultiplier * dx),
        y: parentCoords.y + (NODE_CONSTS.offsetMultiplier * dy)
    }

    const linePoints: coordinatePair = {
        x1: findCircleExitPoint({ ...parentCoords }, NODE_CONSTS.radius, dx, dy)[0],
        y1: findCircleExitPoint({ ...parentCoords }, NODE_CONSTS.radius, dx, dy)[1],
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

    const confirmationCallback = (response: string): void => {
        if (response == "connect") {
            // If modal we get ANOTHER callback to determine if we actually connect (or maybe promise if I have a brain) 
            addNode(id)
            if(postConnect) postConnect();
        } /* else { // I cant see this being anything other than connect. But who knows. YAGNI SHMNAGI I aint rewriting the code to be a boolean return on the callback :D
            console.log(`${id} had ${response}`)
        } */
    }


    const handleClick = useCallback(() => { // Maybe I should move this method elsewhere so a bunch of the callback stuff isnt mixed with the node render code?
        if (connectedNodes.includes(id)) {
            removeNode(id)
        } else {
            NSTC?.triggerNewConfirmation((<p>connect to {id}?</p>), confirmationCallback)
            //addNode(id)
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
                    onMouseEnter={() => NSTC?.setStatusNode({ id, dx, dy, action, actionProps, postConnect, children })} // basically have to reconstruct the node object here with props
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