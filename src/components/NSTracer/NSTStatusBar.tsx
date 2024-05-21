import { NodeData } from "@/data/NSMap.types"
import '@/styles/NSTracer/NSTStatusBar.css'

function actionTypeToStatus(type: NodeData['action']) {
   return {
    'autoconnect': 'green',
    'battle': 'red',
    'dialogue': 'yellow'
   }[type]
}



const NSTStatusBar = ({currentNode} : {currentNode: NodeData}) => {
    return (
        <div className="NST-statusbar">
            <p className={actionTypeToStatus(currentNode.action)}>
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