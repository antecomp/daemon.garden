import USR from '@/assets/sprites/characters/profile/USER.png'
import badge from './assets/badge.png'
import { ContactCardProps } from './Strophalos.types';

const ContactCard = ({name, profile = USR, VLID, homeAddr, currentAddr}: ContactCardProps) => {
	return (
		<div className="contact-card-container">
			<div className="cc-top">
				<figure>
					<img src={profile} alt="" />
				</figure>
				<div className="contact-info">
					{/* Badge will hue-rotate based on status */}
					<h1>{name} <img src={badge} alt="" /> <span className="status-def">AWAKE</span></h1>
					<hr />
					<h2>VLID: {VLID}</h2>
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
					hi buddy
				</div>
			</div>

		</div>
	)
}

export default ContactCard;