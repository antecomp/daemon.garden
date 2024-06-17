import { NoemaData, NoemaMeta } from "@/types/noemata.types";
import { loadX } from "@/util/load";
import { DesktopContextType } from "../Util/Desktop/Desktop.types";
import { DEFAULT_FOLDER, NOEMA_FOLDER, NOEMA_WINID_PREFIX } from "./Mnemosyne.config";
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
import { useCallback, useMemo, useState } from "react";

export const openNoema = (loc: NoemaMeta['location'], addWindow: DesktopContextType['addWindow'], getWindowData: DesktopContextType['getWindowData'], raiseWindow: DesktopContextType['raiseWindow']): void => {
	(async () => {
		try {
			loadX<NoemaData>(NOEMA_FOLDER, loc).then((data): void => {

				if(getWindowData(NOEMA_WINID_PREFIX + data.ID)) { // if the document is already open, just raise it instead.
					raiseWindow(NOEMA_WINID_PREFIX + data.ID)
					return;
				}

				addWindow(NOEMA_WINID_PREFIX + data.ID, {
					content: (<SimpleWindow width={data.dimensions?.width ?? "400px"} height={data.dimensions?.height ?? "450px"} initialPosition={getMousePosition()}>{data.content}</SimpleWindow>),
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
	const { addWindow, getWindowData, raiseWindow } = useDesktopContext();

	const [selectedFolder, setSelectedFolder] = useState<string>(DEFAULT_FOLDER)

	const folders = useMemo<Set<string>>(() => {
		return new Set([...noemata.values()].map(noema => noema.virtualFolder))
	}, [noemata])

	const doesFolderHaveUnread = useCallback((folder: string) => {
		let rtn = false;
		noemata.forEach(noema => {
			if (noema.virtualFolder == folder && !noema.isRead) {rtn = true};
		})
		return rtn;
	}, [noemata])

	return (
		<SimpleWindow {...{ width, height, icon, className, zIndex, windowKey }}>
			<table>
				<tbody>
					<tr>
						<td className="folders-container">
							<u>/NOEMATA/</u>
							<div className="folders">
								{Array.from(folders).map(folder => 
									<option key={`folderlink-${folder}`} value={folder} onClick={() => setSelectedFolder(folder)}>{folder} {doesFolderHaveUnread(folder) && '(unread)'}</option>
								)}
							</div>
						</td>
						<td className="noemata-list">
							{[...noemata.keys()].map(noemaKey => {
								if (noemata.get(noemaKey)!.virtualFolder === selectedFolder)
									{
										
										return (
										<figure className={classNames({ 'is-read': noemata.get(noemaKey)!.isRead })} key={noemaKey} onClick={() => { openNoema(noemata.get(noemaKey)!.location, addWindow, getWindowData, raiseWindow); markNoemaAsSeen(noemaKey) }}>
											<img src={noemata.get(noemaKey)!.isRead ? fileDefaultIcon : fileUnreadIcon} alt="file icon xd" />
											<figcaption>{noemaKey}</figcaption>
										</figure>
									)
								}
							}
							)}
						</td>
					</tr>
				</tbody>
			</table>
		</SimpleWindow>
	)

}

export default Mnemosyne;