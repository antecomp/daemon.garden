import { useModalWindow } from "react-modal-global";
import { BattleProps } from "./battle.types";
import { BattleData } from "@/types/battleData.types";
import { useEffect, useState } from "react";
import DaeCon from "./Daecon";
import TooltipWrapper from "../Util/Tooltip/TooltipWrapper";
import SigilBuilder from "./SigilBuilder";
import TXRX from './assets/TXRX.gif'
import StatusTerm from "./StatusTerm";
import SideStatus from "./SideStatus";
import '@/styles/Battle/Battle.css'

async function loadBattle(filename: string) {
	const response = await import(`@/data/battles/${filename}.ts`)
	return response.default as BattleData;
}

const Battle = ({filename, victoryCB}: BattleProps) => {
	
	const modal = useModalWindow();


	const [battleData, setBattleData] = useState<BattleData | null>();
	useEffect(() => {
		loadBattle(filename).then(battle => setBattleData(battle));
	}, [filename])



	const forceClose = () => {
		modal.close()
		victoryCB(true);
	}

	if(!battleData) {
		return <div className="loading-modal">loading</div>
	}

	const infoTooltip = <>
		<h3>{battleData.name}</h3>
		<p>
			TYPE: {battleData.type} <hr />
			{battleData.description}
		</p>
	</>

	return (
		<div className="battle-container">
			<div className="battle-left">
				<DaeCon img={battleData.sprite}/>
				<div className="battle-bottom">
					<div className="bl">
						DAEMONVEIL FAILURE MANUAL ENGAGEMENT PROTOCOL ONLINE <br/><br/>
						ENTITY ID: 
						<TooltipWrapper tooltipChildren={infoTooltip}>
							{battleData.name}
						</TooltipWrapper>
					</div>
					<div className="sigil-con">
						<SigilBuilder/>
					</div>
					<div className="br">
						<img src={TXRX} alt="" />
					</div>
				</div>
			</div>

			<div className="battle-right" onClick={forceClose}>
				<StatusTerm statusmessages={['battle ', ' output info', ' goes here']}/>
				<SideStatus phtnksStb={0.5} dmStb={0.8} />
			</div>

		</div>
	)
}

export default Battle;