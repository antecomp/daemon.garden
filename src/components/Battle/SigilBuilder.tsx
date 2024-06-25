import { useEffect, useMemo, useState } from "react";
import { DEFAULT_RUNEDATA, RUNEBUILDER_RADIUS } from "./battle.config";
import { PlayerBattleData, RuneData } from "./battle.types";
import { coordinatePair } from "@/extra.types";
import Tooltip from "../Util/Tooltip/Tooltip";
import '@/styles/Battle/SigilBuilder.css'

type SelectedRune = {
	id: number,
	x: number,
	y: number
}

const generateRuneTooltip = (rune: RuneData) => {
	return (
		<>
			<h3>
				{rune.name}
			</h3>
			<p>
				{rune.desc}
			</p>
		</>
	)
}


const SigilBuilder = ({playerRuneData = DEFAULT_RUNEDATA.player}: {playerRuneData?: PlayerBattleData}) => {
	// main circle vars - TODO: move to outer singletime eval consts if none of this will vary.
	const numRunes = playerRuneData.maxNumRunes;
	const runesPerMove = playerRuneData.runesPerMove; // how many runes do we pick before marking as "finished"
	
	const svgDim = RUNEBUILDER_RADIUS * 2.7; /* *2.5 to fit perfectly, making it larger for the outer masking circle to work */
	const cx = svgDim / 2;
	const cy = svgDim / 2;

	const [clickedRunes, setClickedRunes] = useState<SelectedRune[]>([]);
	const [lines, setLines] = useState<coordinatePair[]>([])

	// Finished when we've selected # runes per turn.
	const isMaxRunesSelected = (runesPerMove <= clickedRunes.length)

	// for manual tooltop
	const [tooltipTarget, setTooltipTarget] = useState<JSX.Element | null>(null);


	const handleRuneClick = (id: number, x: number, y: number) => {

		// Do nothing if we already clicked on the rune 
		if(clickedRunes.some(rune => rune.id === id)) {
			return;
		}

		// Prevent clicking on more runes once we're finished (hit max #)
		if(isMaxRunesSelected) return;

		const clickedRune = {id, x, y}

		setClickedRunes(prev => [...prev, clickedRune]);

	}

	//I tried to do this without useeffect and ended up making things significantly more hellish, just keep it who gives a fuck.
	useEffect(() => {
		if(clickedRunes.length > 1) {
			const lastClickedRune = clickedRunes[clickedRunes.length - 2]
			const currentClickedRune = clickedRunes[clickedRunes.length -1]
			const newLine: coordinatePair = {
				x1: lastClickedRune.x,
				x2: currentClickedRune.x,
				y1: lastClickedRune.y,
				y2: currentClickedRune.y
			}
			setLines(prev => [...prev, newLine])
		}
	}, [clickedRunes])

	const runeCircles = useMemo(() => {
		const tempRunes = [];
		for (let i = 0; i < numRunes; i++) {
			const angle = (Math.PI * 2 * i) / numRunes;
			const x = cx + RUNEBUILDER_RADIUS * Math.cos(angle);
			const y = cy + RUNEBUILDER_RADIUS * Math.sin(angle);
	
			tempRunes.push(
				<g key={`rune-${i}`}>
					<circle
						cx={x} cy={y}
						r={RUNEBUILDER_RADIUS / 4}
						stroke="white"
						fill="black"
						onClick={() => handleRuneClick(i, x, y)}
						// if already clicked, change cursor to default to indicate we cant click it again.
						className={clickedRunes.some(rune => rune.id === i) ? 'clickedRune' : 'rune'}
	
	
						// tooltip code
						onMouseEnter={() => !isMaxRunesSelected ? setTooltipTarget(generateRuneTooltip(playerRuneData.runeMap[i])) : setTooltipTarget(null)}
						onMouseLeave={() => setTooltipTarget(null)}
					/>
					<text x={x} y={y} textAnchor='middle' dy=".35em" dx=".1em" fill="white">{playerRuneData.runeMap[i].symbol}</text>
				</g>
			);
		}

		return tempRunes;
	}, [clickedRunes]);

	const handleReset = () => {
		setClickedRunes([]);
		setLines([]);
	}

	return (
		<>
			{tooltipTarget && <Tooltip offset={{ x: 10, y: 10 }} delay={"0.75s"}> {tooltipTarget} </Tooltip>}

			<svg width={svgDim} height={svgDim} className={`runeBuilder ${isMaxRunesSelected ? 'finished' : ''}`}>
				<circle cx={cx} cy={cy} r={RUNEBUILDER_RADIUS * 1.35} stroke="none" fill="black" onClick={handleReset} className='SigilBgCircle' /> {/* bg circle to mask shit to black */}
				<circle cx={cx} cy={cy} r={RUNEBUILDER_RADIUS} stroke="white" fill="none" />
				{runeCircles};
				{lines?.map((line, index) => (
					<line key={index} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="white" strokeWidth={2} />
				))}
			</svg>
		</>
	)



}

export default SigilBuilder;