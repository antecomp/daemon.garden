//import { root } from "@/data/NSMap"
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch"
import WindowContainer from "../Util/Desktop/WindowContainer";
import { WindowProps } from "../Util/Desktop/WindowContainer.types";
import { NST_SVG_DIMENSIONS } from "./NSTracer.config";
import '@/styles/NSTracer/NSTracer.css'
import { root } from "@/data/NSMap";
import NSNode from "./NSNode";
import NSTIcon from '@/assets/ui/window/icons/NST.png'
import NSTStatusBar from "./NSTStatusBar";
import { useState, createContext, ReactNode } from "react";
import { NSTContext, TriggerNewConfirmation } from "./NSTracer.types";
import NSPrompt from "./NSPrompt";

export const NSTracerContext = createContext<NSTContext | null>(null);

/**
 * NSTracer is the container for our NSNode rendered map. It implements the zoom/pan functionality for navigating through the map. It also acts as the Context/"Hoist" point for the callbacks that Nodes will send out when you attempt to 'connect'
 * @param props - Takes normal WindowProps since this is a window. NST doesnt need anything else :) 
 */
const NSTracer = ({ width = "650px", height, icon = NSTIcon, className = "NST-window", zIndex = 0, windowKey }: WindowProps) => {

    const [statusNode, setStatusNode] = useState(root);
    const [confirmationText, setConfirmationText] = useState<ReactNode | null>(null);
    const [confirmationCallback, setConfirmationCallback] = useState<Function>(() => { }) // for some reason putting anything in this function body makes it invoke on render???

    const triggerNewConfirmation: TriggerNewConfirmation = (display, callback) => {
        setConfirmationCallback(() => callback);
        setConfirmationText(display);
    };

    function NSPrompticideFromTracer() { // NSTracer just completely fucking ignores the eventListeners I have for NSPrompt suicide so let's kill it ourselves :D
        if (confirmationCallback && confirmationText !== null) confirmationCallback("cancel by NSPrompticide")
        setConfirmationText(null)
    }



    const Controls = () => {
        const { resetTransform } = useControls();

        return (
            // this is fucking terrible lol. For some reason we only need to do this if button is a component deep. Window-level buttons work??
            <button className="NST-reset-zoom-button" onMouseDown={e => { e.stopPropagation(); NSPrompticideFromTracer() }} onClick={() => resetTransform()}>y</button>

        )
    }

    return (
        <NSTracerContext.Provider value={{ setStatusNode, setConfirmationText, triggerNewConfirmation }}>
            <WindowContainer width={width} height={height} className={className} icon={icon} zIndex={zIndex} windowKey={windowKey} initialPosition={{ x: 30, y: 30 }}>
                <div className="NST-body">
                    <TransformWrapper
                        initialScale={1}
                        initialPositionX={0}
                        initialPositionY={0}
                        doubleClick={{ disabled: true }}
                        onZoomStart={NSPrompticideFromTracer} // murder :)
                    >
                        <Controls />
                        {/* <button onClick={() => console.log("Nightmare")}>AAAAAAAAA</button> // for some god-forsaken reason this button doesnt need to stopProp on onMouseDown  */}
                        <TransformComponent>
                            <svg className="NST-graph" width={NST_SVG_DIMENSIONS.width} height={NST_SVG_DIMENSIONS.height}> {/* TODO: make a system to determine size?? */}
                                <NSNode {...root} parentCoords={{ x: 10, y: 10 }} />
                            </svg>
                        </TransformComponent>
                    </TransformWrapper>
                    <NSTStatusBar currentNode={statusNode} />
                </div>
            </WindowContainer>
            {confirmationText && <NSPrompt callback={confirmationCallback} display={confirmationText} />}
        </NSTracerContext.Provider>
    )

}

export default NSTracer