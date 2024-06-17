import { NoemaData, NoemaMeta } from "@/types/newNoema.types";
import { DesktopContextType } from "../Util/Desktop/Desktop.types";
import { loadX } from "@/util/load";
import { DEFAULT_FOLDER, NOEMA_FOLDER, NOEMA_WINID_PREFIX } from "./Mnemosyne.config";
import SimpleWindow from "../Util/Desktop/SimpleWindow";
import { getMousePosition } from "@/util/getMousePosition";
import noemaIcon from "@/assets/ui/window/icons/noema.png"
import useNoemaStore from "@/stores/noemataStore";
import useDesktopContext from "@/hooks/useDesktopContext";
import { useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import fileDefaultIcon from './assets/file_default.png';
import fileUnreadIcon from './assets/file_unread.png';
import { WindowProps } from "../Util/Desktop/WindowContainer.types";
import '@/styles/Mnemosyne/Mnemosyne.css'

export const openNoema = (noema: NoemaMeta, desktopContext: DesktopContextType): void => {
    (async () => {
        try {
            loadX<NoemaData>(NOEMA_FOLDER, noema.location).then((data): void => {

                if(desktopContext.getWindowData(NOEMA_WINID_PREFIX + noema.name)) {
                    desktopContext.raiseWindow(NOEMA_WINID_PREFIX + noema.name)
                    return;
                }

                desktopContext.addWindow(NOEMA_WINID_PREFIX + noema.name, {
                    content: (
                        <SimpleWindow 
                            width={data.dimensions?.width ?? "400px"} 
                            height={data.dimensions?.height ?? "450px"}
                            initialPosition={getMousePosition()}
                        >
                            {data.content}
                        </SimpleWindow>
                    ),
                    icon: noemaIcon
                })

            })
        } catch (err) {
            console.error(`Failed to open document: `, err)
        }
    })()
}

const Mnemosyne = ({ width = "450px", height = "480px", icon = noemaIcon, className = "mnemosyne", zIndex = 0, windowKey = 'mnemosyne' }: WindowProps) => {
    const {noemata, markNoemataAsSeen} = useNoemaStore();

    const DKT = useDesktopContext();

    const [selectedFolder, setSelectedFolder] = useState<string>(DEFAULT_FOLDER)

    const folders = useMemo<string[]>(() => {
        return Object.keys(noemata)
    }, [noemata])

    const doesFolderHaveUnread = useCallback((folderToCheck: string) => {
        let rtn = false;
        Object.entries(noemata[folderToCheck]).forEach(([_key, noema]) => {
            if(!noema.isRead) {rtn = true}
        })
        return rtn;
    }, [noemata])
    

    return (
        <SimpleWindow {...{width, height, icon, className, zIndex, windowKey}}>
            <table>
                <tbody>
                    <tr>
                        <td className="folders-container">
                            <u>/NEOMATA/</u>
                            <div className="folders">
                                {folders.map(folder => 
                                    <option 
                                        key={`folderlink-${folder}`} 
                                        value={folder} 
                                        onClick={() => setSelectedFolder(folder)}
                                    >
                                        {folder} {doesFolderHaveUnread(folder) && '(unread)'}
                                    </option>
                                )}
                            </div>
                        </td>
                        <td className="noemata-list">
                            {Object.entries(noemata[selectedFolder]).map(([key, noema]) =>
                                {
                                    return (
                                        <figure 
                                            className={classNames({'is-read': noema.isRead})}
                                            key={key}
                                            onClick={() => {openNoema(noema, DKT); markNoemataAsSeen(selectedFolder, key)}}
                                        >
                                            <img src={noema.isRead ? fileDefaultIcon : fileUnreadIcon} />
                                            <figcaption>{noema.name}</figcaption>
                                        </figure>
                                    )
                                }
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </SimpleWindow>
    )

}

export default Mnemosyne