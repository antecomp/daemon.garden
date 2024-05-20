//import { root } from "@/data/NSMap"
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch"
import WindowContainer from "../Util/Desktop/WindowContainer";
import { WindowContainerClientProps } from "../Util/Desktop/WindowContainer.types";
import { NST_SVG_DIMENSIONS } from "./NSTracer.config";

const NSTracer= ({width = "650px", height, icon, className = "NST-window", zIndex = 0, windowKey} : WindowContainerClientProps) => {

    const Controls = () => {
        //const { resetTransform } = useControls();

        function handleResetClick(e: React.MouseEvent) {
            e.stopPropagation;
            console.log("trigger");
        }

        return (
          
               <button onClick={handleResetClick}>please work I swear</button>
           
        )
    }

    return (
       <WindowContainer width={width} height={height} className={className} icon={icon} zIndex={zIndex} windowKey={windowKey}>
            <div className="NST-body">
                <TransformWrapper
                    initialScale={1}
                    initialPositionX={0}
                    initialPositionY={0}
                    doubleClick={{disabled: true}}
                >
                     <Controls/>
                    <button onClick={() => console.log("Nightmare")}>AAAAAAAAA</button>   
                    <TransformComponent>
                        <svg className="NST-graph" width={NST_SVG_DIMENSIONS.width} height={NST_SVG_DIMENSIONS.height}> {/* TODO: make a system to determine size?? */}
                            {/* 
                                <Node {...root} />
                            */}
                             <circle cx="50" cy="50" r="50" fill="red" stroke="green" strokeWidth="3" />
                        </svg>
                    </TransformComponent>
                </TransformWrapper>
            </div>
       </WindowContainer>
    )

}

export default NSTracer