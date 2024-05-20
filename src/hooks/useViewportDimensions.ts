import { useEffect, useState } from "react";

function getViewportDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width, height
    }
}

export default function useViewportDimensions() {
    const [viewportDimensions, setViewportDimensions] = useState(getViewportDimensions())

    useEffect(() => {
        function handleResize() {
            setViewportDimensions(getViewportDimensions());
        }

        window.addEventListener('resize', handleResize); 

        //unmount
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return viewportDimensions;
}