import '@/styles/Strophalos/Strophalos.css'
import { WindowProps } from '../Util/Desktop/WindowContainer.types'
import strophalosIcon from '@/assets/ui/window/icons/strophalos.png'
import SimpleWindow from '../Util/Desktop/SimpleWindow'
import ContactCard from './ContactCard'
import ContactItem from './ContactItem'

const Strophalos = ({
	width = "532px",
	height = "320px",
	icon = strophalosIcon,
	className = "strophalos-window",
	zIndex = 0,
	windowKey = "strophalos"
}: WindowProps) => {

	// State for currently selected contact, sets the props for ContactCard
	// List of contacts grab from zustand store I reckon...

	return (
		<SimpleWindow {...{width, height, icon, className, zIndex, windowKey}}> 
			<table>
				<tbody>
					<tr>
						<td className="contact-list">
							<div>
								<ContactItem name="Svalinn" onClick={() => {console.log("test")}} />
								<ContactItem name="Omnidisplay" onClick={() => {console.log("test")}} />
								<ContactItem name="Moribund" onClick={() => {console.log("test")}} />
								<ContactItem name="Moribund" onClick={() => {console.log("test")}} />
								<ContactItem name="Moribund" onClick={() => {console.log("test")}} />
							</div>
						</td>
						<td>
							<ContactCard name='Svalinn' VLID={'fae77:700ab'} homeAddr={'kv:00000'} currentAddr={'unknown'} />
						</td>
					</tr>
				</tbody>
			</table>
		</SimpleWindow>
	)
}

export default Strophalos