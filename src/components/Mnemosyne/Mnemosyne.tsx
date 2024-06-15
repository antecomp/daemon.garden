import { NoemaData, NoemaMeta } from "@/types/noemata.types";
import { loadX } from "@/util/load";
import { DesktopContextType } from "../Util/Desktop/Desktop.types";
import { NOEMA_FOLDER } from "./Mnemosyne.config";
import SimpleWindow from "../Util/Desktop/SimpleWindow";
import useNoemataStore from "@/stores/noemaStore";
import useDesktopContext from "@/hooks/useDesktopContext";
import { WindowProps } from "../Util/Desktop/WindowContainer.types";
import nomeaIcon from "@/assets/ui/window/icons/noema.png"
import '@/styles/Mnemosyne/Mnemosyne.css'
import fileDefaultIcon from './assets/file_default.png'
import fileUnreadIcon from './assets/file_unread.png'
import { getMousePosition } from "@/util/getMousePosition";
import classNames from "classnames";

export const openNoema = (loc: NoemaMeta['location'], addWindow: DesktopContextType['addWindow']): void => {
	(async () => {
		try {
			loadX<NoemaData>(NOEMA_FOLDER, loc).then((data) => {
				addWindow(`Noema : ${data.ID}`, {
					content: (<SimpleWindow width="450px" height="480px" initialPosition={getMousePosition()}>{data.content}</SimpleWindow>),
					icon: nomeaIcon,
				})
			})
		} catch (err) {
			console.error(`Failed to open document: `, err)
		}
	})()
}

const Mnemosyne = ({ width = "450px", height = "480px", icon = nomeaIcon, className = "mnemosyne", zIndex = 0, windowKey = 'mnemosyne' }: WindowProps) => {
	const { noemata, markNoemaAsSeen } = useNoemataStore();
	const { addWindow } = useDesktopContext();

	return (
		<SimpleWindow {...{ width, height, icon, className, zIndex, windowKey }}>
			<table>
				<tbody>
				<tr>
					<td className="folders-container">
						<u>/NOEMATA/</u>
						<div className="folders">
							<option value="documents">local</option>
							<option value="documents">kestrel.locuspak</option>
						</div>
					</td>
					<td className="noemata-list">
						{[...noemata.keys()].map(noemaKey =>
							<figure className={classNames({'is-read': noemata.get(noemaKey)!.isRead})} key={noemaKey} onClick={() => {openNoema(noemata.get(noemaKey)!.location, addWindow); markNoemaAsSeen(noemaKey)}}>
								<img src={noemata.get(noemaKey)!.isRead ? fileDefaultIcon : fileUnreadIcon} alt="file icon xd" />
								<figcaption>{noemaKey}</figcaption>
							</figure>
						)}
					</td>
				</tr>
				</tbody>
			</table>
		</SimpleWindow>
	)

}

export default Mnemosyne;