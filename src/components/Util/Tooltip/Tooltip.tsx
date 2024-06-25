// Based on (stolen from) https://yoavik.com/snippets/mouse-tracker

import { useEffect, useRef } from "react";
import { TooltipCSS, TooltipProps } from "./Tooltip.types";
import { createPortal } from "react-dom";
import cls from 'classnames'
import '@/styles/Util/Tooltip/Tooltip.css'
import wc from '@/assets/ui/window/win_single_corner_right.png'

/**
 * Component that actually spawns the tooltip with portals. Usually you won't use this directly (use ToolTipWrapper when possible). 
 * @param children (obvious). 
 * @param className - supplamental classname to the base 'tooltip' one. 
 * @param offset Point, transform (x,y)px away from mouse position.  
 * @param delay how long the user has to hover to show the tooltip.
 * @returns 
 */

const Tooltip = ({children, className, offset = {x: 10, y: 10}, delay} : TooltipProps) => {
	const element = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		function handler(e: MouseEvent) {
			if(element.current) {
				const x = e.clientX + offset.x;
				const y = e.clientY + offset.y;
				element.current.style.transform = `translate(${x}px, ${y}px)`;
				element.current.classList.add('show-tooltip')
			}
		}

		document.addEventListener('mousemove', handler);

		return () => document.removeEventListener('mousemove', handler)
	}, [offset.x, offset.y])


	return createPortal(
		<div className={cls('tooltip', className)} ref={element} style={{"--tooltip-delay": `${delay}`} as TooltipCSS}>
			<div className='tooltip-content'>
				{children}
			</div>
			<footer>
				<span></span>
				<img src={wc} alt="" />
			</footer>
		</div>
		, document.body
	)

}

export default Tooltip;