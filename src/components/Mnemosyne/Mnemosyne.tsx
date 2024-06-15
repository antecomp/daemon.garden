import { NoemaData, NoemaMeta } from "@/types/noemata.types";
import { loadX } from "@/util/load";
import { DesktopContextType } from "../Util/Desktop/Desktop.types";
import { NOEMA_FOLDER } from "./Mnemosyne.config";
import SimpleWindow from "../Util/Desktop/SimpleWindow";
import useNoemataStore from "@/stores/noemaStore";
import useDesktopContext from "@/hooks/useDesktopContext";
import { WindowProps } from "../Util/Desktop/WindowContainer.types";

export const openNoema = (loc: NoemaMeta['location'], addWindow: DesktopContextType['addWindow']): void => {
	(async () => {
		try {
			loadX<NoemaData>(NOEMA_FOLDER, loc).then((data) => {
				addWindow(`Noema : ${data.ID}`, {
					content: (<SimpleWindow width="450px" height="480px">{data.content}</SimpleWindow>)
				})
			})
		} catch (err) {
			console.error(`Failed to open document: `, err)
		}
	})()
}

const Mnemosyne = ({ width = "450px", height, icon, className = "mnemosyne", zIndex = 0, windowKey = 'mnemosyne'}: WindowProps) => {
	const {noemata, markNoemaAsSeen} = useNoemataStore();
	const {addWindow} = useDesktopContext();

	return (
		<SimpleWindow {...{width, height, icon, className, zIndex, windowKey}}>
			<div>
				{[...noemata.keys()].map(noemaKey => 
					<button key={`noema-link-${noemaKey}`} onClick={() => openNoema(noemata.get(noemaKey)!.location, addWindow)}> {noemaKey}</button>
				)}
			</div>
		</SimpleWindow>
	)

}

export default Mnemosyne;