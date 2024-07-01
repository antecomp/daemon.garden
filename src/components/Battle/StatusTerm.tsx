import '@/styles/Battle/StatusTerm.css'
import battltermIcon from './assets/battleterm_icon.png'

const StatusTerm = ({ statusmessages }: {statusmessages: string[]}) => { // messages type will be changed

	return (
		<div className="battle-status-term">
			<div className="titlebar">
				<img src={battltermIcon}></img>
			</div>
			<div className="status-output">
				{statusmessages}
			</div>
		</div>
	)
}


export default StatusTerm;