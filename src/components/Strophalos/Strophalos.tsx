import '@/styles/Strophalos/Strophalos.css'
import { WindowProps } from '../Util/Desktop/WindowContainer.types'
import strophalosIcon from '@/assets/ui/window/icons/strophalos.png'
import SimpleWindow from '../Util/Desktop/SimpleWindow'
import ContactCard from './ContactCard'
import ContactItem from './ContactItem'
import useStophalosStore from '@/stores/strophalosStore'
import { useState } from 'react'
import { VLID } from '@/extra.types'


const Strophalos = ({
	width = "532px",
	height = "320px",
	icon = strophalosIcon,
	className = "strophalos-window",
	zIndex = 0,
	windowKey = "strophalos"
}: WindowProps) => {

	const {contacts} = useStophalosStore();

	const [shownContactVLID, setShownContactVLID] = useState<VLID | null>(null)

	return (
		<SimpleWindow {...{width, height, icon, className, zIndex, windowKey}}> 
			<table>
				<tbody>
					<tr>
						<td className="contact-list">
							<div>
								{
									// The day that TS can infer type from Object.entries is the day I ascend.
									Object.entries(contacts).map(([V,info]) => {
										const vlid = V as VLID
										return(<ContactItem key={vlid} name={info.name} onClick={() => setShownContactVLID(vlid)}/>)
									})
								}
							</div>
						</td>
						<td>
							{shownContactVLID && contacts[shownContactVLID] && (<ContactCard {...contacts[shownContactVLID]}/>)}
						</td>
					</tr>
				</tbody>
			</table>
		</SimpleWindow>
	)
}

export default Strophalos