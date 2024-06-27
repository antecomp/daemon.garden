import USR from '@/assets/sprites/characters/profile/USER.png'
import badge from './assets/badge.png'
import { ContactCardProps } from "@/types/strophalos.types";
import { calcStatusFilter } from './helpers';

const ContactCard = ({name, profile = USR, vlid, homeAddr, currentAddr, status, note = ""}: ContactCardProps) => {
	return (
		<div className="contact-card-container">
			<div className="cc-top">
				<figure>
					<img src={profile} alt="" />
				</figure>
				<div className="contact-info">
					<h1>
						{name} 
						{/* Badge will hue-rotate based on status */}
						<img src={badge} style={{filter: calcStatusFilter(status)}} alt="" /> 
						<span className="status-def">{status.toUpperCase()}</span></h1>
					<hr />
					<h2>VLID: {vlid}</h2>
					<ul>
						<li>send message</li>
						<li>view message history</li>
					</ul>
				</div>
			</div>
			<div className="cc-bot">
				<div className="cc-details">
					<div>
						<p>HOME SUBDOMAIN</p><span></span><p>{homeAddr}</p>
					</div>
					<div>
						<p>CURRENT SUBDOMAIN</p><span></span><p>{currentAddr}</p>
					</div>
				</div>
				<div className="cc-notes">
					{note}
				</div>
			</div>

		</div>
	)
}

export default ContactCard;