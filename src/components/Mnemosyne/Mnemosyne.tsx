import { NoemaMeta } from "@/types/noema.types";
import { DesktopContextType } from "../Util/Desktop/Desktop.types";
import { DEFAULT_FOLDER, NOEMA_WINID_PREFIX, noemaFolders } from "./Mnemosyne.config";
import SimpleWindow from "../Util/Desktop/SimpleWindow";
import { getMousePosition } from "@/util/getMousePosition";
import noemaIcon from "@/assets/ui/window/icons/noema.png"
import useNoemaStore from "@/stores/noemataStore";
import useDesktopContext from "@/hooks/useDesktopContext";
import { useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import fileDefaultIcon from './assets/file_default.png';
import fileUnreadIcon from './assets/file_unread.png';
import unreadBadge from './assets/unread_badge.png'
import { WindowProps } from "../Util/Desktop/WindowContainer.types";
import '@/styles/Mnemosyne/Mnemosyne.css'

async function loadNoemaFile (inputPath: NoemaMeta['location']) {
    try {
        const pathParts = inputPath.split('/');
    
        if (pathParts.length!== 2) {
            throw new Error('Invalid file path format');
        }
    
        const folder = pathParts[0] as noemaFolders;
        const filename = pathParts[1];

        const response = await import(`@/data/noemata/${folder}/${filename}.tsx`);
        return response.default;
    } catch (error) {
        throw new Error(`Failed to load file: ${error}`)
    }
}


export const openNoema = (noema: NoemaMeta, desktopContext: DesktopContextType): void => {
    (async () => {
        try {
                loadNoemaFile(noema.location).then((data): void =>  {

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
    const {noemata, markNoemaAsSeen} = useNoemaStore();

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
                                    <a 
                                        key={`folderlink-${folder}`}  
                                        onClick={() => setSelectedFolder(folder)}
                                    >
                                        {doesFolderHaveUnread(folder) && <img src={unreadBadge} alt="slop"/>} {folder}
                                    </a>
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
                                            onClick={() => {openNoema(noema, DKT); markNoemaAsSeen(selectedFolder, key)}}
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