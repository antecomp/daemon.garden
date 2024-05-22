import { ReactNode } from "react"

export type TriggerNewConfirmation = (display: ReactNode, callback: Function) => void;
export interface NSTContext {
    setStatusNode: Function
    setConfirmationText: Function
    triggerNewConfirmation: TriggerNewConfirmation
}