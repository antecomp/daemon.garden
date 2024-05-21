//import { root } from "@/data/NSMap"
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch"
import WindowContainer from "../Util/Desktop/WindowContainer";
import { WindowProps } from "../Util/Desktop/WindowContainer.types";
import { NST_SVG_DIMENSIONS } from "./NSTracer.config";
import '@/styles/NSTracer/NSTracer.css'
import { root } from "@/data/NSMap";
import NSNode from "./NSNode";

const NSTracer= ({width = "650px", height, icon, className = "NST-window", zIndex = 0, windowKey} : WindowProps) => {

    const Controls = () => {
        const { resetTransform } = useControls();

        return (
                // this is fucking terrible lol. For some reason we only need to do this if button is a component deep. Window-level buttons work??
               <button className="NST-reset-zoom-button" onMouseDown={e => e.stopPropagation()} onClick={() => resetTransform()}>y</button>
           
        )
    }

    return (
       <WindowContainer width={width} height={height} className={className} icon={icon} zIndex={zIndex} windowKey={windowKey} initialPosition={{x: 20, y: 20}}>
            <div className="NST-body">
                <TransformWrapper
                    initialScale={1}
                    initialPositionX={0}
                    initialPositionY={0}
                    doubleClick={{disabled: true}}
                >
                     <Controls/>
                    {/* <button onClick={() => console.log("Nightmare")}>AAAAAAAAA</button> // for some god-forsaken reason this button doesnt need to stopProp on onMouseDown  */} 
                    <TransformComponent>
                        <svg className="NST-graph" width={NST_SVG_DIMENSIONS.width} height={NST_SVG_DIMENSIONS.height}> {/* TODO: make a system to determine size?? */}
                                <NSNode {...root} parentCoords={{x: 10, y: 10}} />
                        </svg>
                    </TransformComponent>
                </TransformWrapper>
            </div>
       </WindowContainer>
    )

}

export default NSTracer