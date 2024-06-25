import TooltipWrapper from "../Util/Tooltip/TooltipWrapper";
import '@/styles/Battle/SideStatus.css'

const Bar = ({filled}: {filled: boolean}) => {
	return <span className={'bar ' + (filled ? " filled" : "")}></span>
}

const Meter = ({level}: {level: number}) => {
	// makes an array of [true, true, true, false..] to indicate level - passed to bars.
	const bars = Array.from({length: 20}, (_, index) => index < level);

	return (
		<div className="meter">
			{bars.map((filled, index) => (
				<Bar key={`meterbar-${index}`} filled={filled}/>
			))}
		</div>
	)
}


const phtdesc = (
	<>
			<h4>
				Phantastikos Corruption
			</h4>
			<p>
				"ADVERSARY HEALTH" STABILITY OF DAEMONS ILLUSTION. REDUCE TO VANQUISH.
			</p>
		</>
)

const dmdesc = (
	<>
			<h4>
				Daemonveil Stability
			</h4>
			<p>
				"USER HEALTH" <br /> DAEMONVEIL PROTECTS FROM DAEMONIC INFLUENCE. TOTAL DAEMONVEIL FAILURE TRIGGERS AUTOMATIC EJECTION OF VI-LINK
			</p>
		</>
)

const SideStatus = ({ phtnksStb, dmStb }: {phtnksStb: number, dmStb: number}) => {
	return (
		<div className="battle-side-status">
			<div className="sid">USR VI-ID: dv8:8a3</div>
			<div className="sid">RCP VI-ID: ---:---</div>
			<hr />
			<div className="stb"><TooltipWrapper tooltipChildren={phtdesc}>PHTNKS CRRPTN</TooltipWrapper> <Meter level={phtnksStb * 20} /> </div>
			<div className="stb"><TooltipWrapper tooltipChildren={dmdesc}>DMVEIL STBLTY</TooltipWrapper> <Meter level={dmStb * 20} /> </div>
		</div>
	)
}

export default SideStatus;