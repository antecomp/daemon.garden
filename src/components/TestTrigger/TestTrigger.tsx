import { useModalWindow } from "react-modal-global"
import { NSNodeTriggerProps } from "../NSTracer/NSNode.types"
import '@/styles/TestTrigger/TestTrigger.css'
import { toast } from "react-toastify"


interface TestTriggerProps extends NSNodeTriggerProps {
    actionProps: {
        text: string,
        connectText: string,
        rejectText: string,
        onConnectText: string,
        onRejectText: string
    }
}


const TestTrigger = ({sendNodeResponse, actionProps}: TestTriggerProps) => {

    const modal = useModalWindow()

    const handleBtnClick = (x: boolean) => {
        sendNodeResponse(x);

        toast(x ? actionProps.onConnectText : actionProps.onRejectText)

        modal.close()
    }


    return (
        <div className="test-trigger-window">
            <div className="test-trigger-content">
                <p>{actionProps.text}</p>
                <button onClick={() => handleBtnClick(true)}>{actionProps.connectText}</button>
                <button onClick={() => handleBtnClick(false)}>{actionProps.rejectText}</button>
            </div>
        </div>
    )
}

export default TestTrigger