import { ReactNode, useState } from "react";
import { TooltipWrapperProps } from "./Tooltip.types";
import Tooltip from "./Tooltip";

const TooltipWrapper = ({children, tooltipChildren, enabled = true, offset = {x: 10, y: 10}, delay = "0.25s"}: TooltipWrapperProps) => {
	
	const [tooltipTarget, setTooltipTarget] = useState<ReactNode | null>(null)

	return (
		<>
			{tooltipTarget && <Tooltip offset={offset} delay={delay}> {tooltipTarget} </Tooltip>}
			<span
				className="has-tooltip"
				onMouseEnter={() => enabled ? setTooltipTarget(tooltipChildren) : setTooltipTarget(null)}
				onMouseLeave={() => setTooltipTarget(null)}
			>
				{children}
			</span>
		</>
	)
}

export default TooltipWrapper