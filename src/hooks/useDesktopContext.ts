import { useContext } from "react";
import { DesktopContext } from "@/components/Util/Desktop/Desktop";
import { DesktopContextType } from "@/components/Util/Desktop/Desktop.types";

/** 
 * Custom hook to nicely access DesktopContext
 * @returns {DesktopContextType} The desktop context values
 * @throws Will error out if accesser is not a child of Desktop (outside of DesktopContext Provider)
 */
const useDesktopContext = (): DesktopContextType => {
    const ctx = useContext(DesktopContext);
    if(!ctx) {
        throw new Error('useDesktopContext must be used within DesktopContext.Provider (must be child of Desktop component)')
    }

    return ctx;
}

export default useDesktopContext;