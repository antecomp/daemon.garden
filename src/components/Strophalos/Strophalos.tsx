import '@/styles/Strophalos/Strophalos.css'
import { WindowProps } from '../Util/Desktop/WindowContainer.types'
import strophalosIcon from '@/assets/ui/window/icons/strophalos.png'
import SimpleWindow from '../Util/Desktop/SimpleWindow'
import ContactCard from './ContactCard'
import ContactItem from './ContactItem'
import useStophalosStore from '@/stores/strophalosStore'
import { useState } from 'react'

const Strophalos = ({
	width = "532px",
	height = "320px",
	icon = strophalosIcon,
	className = "strophalos-window",
	zIndex = 0,
	windowKey = "strophalos"
}: WindowProps) => {

	const {contacts} = useStophalosStore();

	const [shownContactKey, setShownContactKey] = useState<string | null>(Object.keys(contacts)[0])

	return (
		<SimpleWindow {...{width, height, icon, className, zIndex, windowKey}}> 
			<table>
				<tbody>
					<tr>
						<td className="contact-list">
							<div>
								{
									// The day that TS can infer type from Object.entries is the day I ascend.
									Object.entries(contacts).map(([K,info]) => {
										return(<ContactItem key={K} name={info.name} onClick={() => setShownContactKey(K)}/>)
									})
								}
							</div>
						</td>
						<td>
							{shownContactKey && contacts[shownContactKey] && (<ContactCard {...contacts[shownContactKey]}/>) || (<p className='SCNC'>Please select contact</p>)}
						</td>
					</tr>
				</tbody>
			</table>
		</SimpleWindow>
	)
}

export default Strophalos