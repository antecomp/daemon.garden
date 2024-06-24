import { NodeData } from "@/data/NSMap.types"
import '@/styles/NSTracer/NSTStatusBar.css'

function actionTypeToStatus(AP: NodeData['actionProps']) {

   if (!AP) return 'limegreen' // autoconnect

   return {
    'battle': 'red',
    'dialogue': 'yellow',
    'testpopup': 'purple'
   }[AP.actionType]
}



const NSTStatusBar = ({currentNode} : {currentNode: NodeData}) => {
    return (
        <div className="NST-statusbar">
            <p style={{color: actionTypeToStatus(currentNode.actionProps)}}>
             [|]
            </p>
            <p>
                {currentNode.id}
            </p>
            <p>
                {!currentNode.children ? "terminal" : "routes online"}
            </p>
            <span></span>
        </div>
    )
}

export default NSTStatusBar