import USR from '@/assets/sprites/characters/profile/USER.png'
import badge from './assets/badge.png'
import { ContactCardProps, ContactStatus } from "@/types/strophalos.types";
import { calcStatusFilter } from './helpers';
import { HermesCollection } from '@/types/hermes.types';
import useDynamicHermesStore from '@/stores/dynamicHermesStore';
import classNames from 'classnames';

type HermesGeneratorFunc = () => HermesCollection

async function loadHermesGeneratorForContact(filename: string): Promise<(HermesGeneratorFunc)> {
	try {
		const response = await import(`@/data/hermes/ST/${filename}.ts`);
		return response.default as HermesGeneratorFunc;
	} catch (error) {
		throw new Error(`Failed to load file: ${error}`)
	}
}

async function initiateDynamicHermesForContact(hermesGeneratorFilename: string) {

	const {isActive: isHermesActive, initiateHermes} = useDynamicHermesStore.getState()

	if(isHermesActive) {
		console.error("ContactCard Precatch: Cannot initiate contacts dynamic Hermes instance as Hermes is currently active")
		return;
	}

	try {
		const generatorFunc = await loadHermesGeneratorForContact(hermesGeneratorFilename);
		initiateHermes(generatorFunc);
	} catch (error) {
		console.error("Unable to initiate hermes for contact, due to other error... ", error)
	}
}

const ContactCard = ({name, profile = USR, vlid, homeAddr, currentAddr, status, note = "", hermesGeneratorFilename}: ContactCardProps) => {

	const {isActive: isHermesActive} = useDynamicHermesStore();

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
						<img src={badge} style={{filter: calcStatusFilter(status)}} alt="" />  {/* TODO: Just change this to swap out the badge src. This hue rotate is jank. */}
						<span className="status-def">{status.toUpperCase()}</span></h1>
					<hr />
					<h2>VLID: {vlid}</h2>
					<ul>
						<li 
							onClick={() => {hermesGeneratorFilename && initiateDynamicHermesForContact(hermesGeneratorFilename)}}
							className={classNames({
								"cannot-message": isHermesActive || !hermesGeneratorFilename || (status != ContactStatus.Awake)
							})}
						>
							send message
						</li>
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