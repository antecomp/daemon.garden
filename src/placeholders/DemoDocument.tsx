import titleImg from '@/assets/images/title.png'
import { useState } from 'react'
import { useCombinedGDStore } from '@/store';
import { sendMessageToast } from '@/components/Util/Toasts/Toasts';
import svalinn from '@/assets/sprites/characters/profile/USER.png'
import TooltipWrapper from '@/components/Util/Tooltip/TooltipWrapper';
import useDesktopContext from '@/hooks/useDesktopContext';
import SimpleWindow from '@/components/Util/Desktop/SimpleWindow';
import FauxScript from '@/components/FauxScript/FauxScript';
import useHermesStore from '@/stores/hermesStore';

export default function DemoDocument() {
      const [count, setCount] = useState(0);

      const {dangerouslyInitiateHermes} = useHermesStore();

      //const connectedNodes = useNSTStore((state) => state.connected)
      //const addNode = useNSTStore((state) => state.addNode)
      const {addNode, removeNode, addNoema} = useCombinedGDStore()

      const {addWindow} = useDesktopContext()

      const showTermTest = () => {
            addWindow("TERMTEST", {
                  content: (<SimpleWindow><FauxScript windowKey='TERMTEST' text={`expanding LocusPak.​​​​​.​​​​​. \n contextualizing thoughtstreams.​​​​​​​​.​​​​​. \n opening explorer.​​​​​.​​​​​.`} callback={() => console.log("done")} /></SimpleWindow>),
			height: '100px',
			width: '250px',
			isPopup: true
            })
      }

	return (
		<>
            <h1 style={{ 'fontWeight': 'normal' }}>RECOVERED DOCUMENT</h1>
            <h2>state test: count is {count}</h2>
            <button onClick={() => dangerouslyInitiateHermes('demo')}>Run demo Hermes sequence.</button>
            <button onClick={() => setCount(prev => prev +1)}>inc count</button>
            <button
                  onClick={showTermTest}
            >
                  Open Console Popup</button>
            <hr />
            <button onClick={() => addNode('divi:home')}>test add NSTSave</button>
            <button onClick={() => removeNode('divi:home')}>test remove NSTSave</button>
            <button onClick={() => addNoema('local', 'test file', {
                  name: 'test file',
                  location: 'local/devnote'
            })}>Test add file</button>
            <button onClick={() => addNoema('remote', 'noema desc', {
                  name: 'noema desc',
                  location: 'remote/noemaDefinition'
            })}>Add noemaDesc file</button>
            <button onClick={() => sendMessageToast({title: "Svalinn", img: svalinn, msg: "Hello developer!"})}>Show notification</button>
            <hr />
            <br /><br />
            <div style={{ 'textAlign': 'center' }} ><img src={titleImg} width={`426px`} style={{imageRendering: 'auto'}} /></div>
            The year is 20XX, and reality has been sacrificed on the altar of "more." The morasses of the world-as-we-know-it, as ugly as they are, were put on a seemingly endless backburner. With the global community no longer pretending to promise a future worth welcoming, men and women work tirelessly for rewards far more immediate- the infinite intrigues and pleasures of the Nullspace.
            <br />
            In the year 2000, <TooltipWrapper tooltipChildren={(
                  <><h3>ASURACOM</h3> Technomancy company, maintainer of the VI-LINK system and Civilian Null-space</>)}>ASURACOM</TooltipWrapper> was founded. This engineering and computer technologies corporation would rediscover (with great consequence) technology that would ensure the world never left the course it was set upon. The VI-LINK, first officially prototyped in 2012, was the first device ever created with the capacity to interface with the human soul. And in 2013, the VI-LINK received a much needed security patch in the form of
            the <TooltipWrapper tooltipChildren={(<><h3>DAEMONVEIL</h3>Local VI-LINK firewall system. Protects conscious render from daemonic influence and other unauthorized illusions.</>)}>Daemonveil</TooltipWrapper>,
            before being released to the world at large.
            <br />
            From that point on, life was conducted differently. The "Nullspace", a theoretically infinite plane of data storage, became a household name. Why would it not, after all, when it was so much more efficient and moldable than the real world? From the comfort of their own homes, hooked into these collaborative hallucinations, people handled all the business of day to day life.
            <br />
            The boring details of real life began to seem more taboo as time shambled onwards. The domains and subdomains offered entire simulated cities, fantasy realms, entertainment venues, religious experiences, and more. For many, the "real world", at best, became a troublesome necessity- participation was required to keep themselves tethered to the great beyond through the VI-LINK.
            <br />
            Not all within the Nullspace is so idyllic, however. As an interstice it reflects both the evils of humanity and the alien nature of what lies in the distance. ASURACOM fought hard to secure the tip of the proverbial iceberg, but an entire world dwells beneath the surface. What could be found in these depths? Or… who?
            <br /><br />
            <hr />
            <br /><br />
            Id dolore elit officia tempor reprehenderit. Labore voluptate reprehenderit consequat do aliquip cillum. Magna amet mollit exercitation dolore eu fugiat laboris velit ipsum consectetur. Sint consectetur in consequat aliquip. Cillum tempor adipisicing nisi deserunt do voluptate ad.

            Veniam sunt aliqua proident adipisicing culpa proident irure laborum sunt dolor amet nostrud. Ut fugiat aliquip culpa Lorem. Anim ipsum enim magna aute aute. Dolore nulla officia nostrud fugiat non minim fugiat ipsum incididunt veniam dolore consectetur sunt fugiat.

            Excepteur exercitation fugiat nulla adipisicing commodo excepteur reprehenderit est nisi. Eu ut exercitation ipsum non commodo. In veniam in esse reprehenderit laborum voluptate proident pariatur. Ex qui magna sit qui magna.

            Id elit elit cillum fugiat est. Cupidatat magna dolore commodo incididunt eiusmod minim aliquip dolor minim adipisicing elit duis laboris id. Nulla Lorem id Lorem culpa officia. Dolor deserunt commodo laboris pariatur laboris aliquip. Et tempor culpa eiusmod consequat laboris aute nulla officia cillum id labore. Voluptate anim id do labore cupidatat voluptate.

            Adipisicing officia sunt excepteur ullamco aliquip laborum amet incididunt eiusmod minim labore. Id sit excepteur velit id dolor. Ea incididunt ex nostrud occaecat enim nisi cupidatat aliquip qui. Et mollit et eu officia est. Irure magna quis voluptate cupidatat consequat aliquip minim id consequat officia enim exercitation dolore. Aute occaecat cillum fugiat voluptate nisi amet.

            Occaecat adipisicing et esse tempor reprehenderit. Culpa enim pariatur deserunt ex amet magna et veniam sit velit aliqua tempor exercitation esse. Ipsum mollit voluptate proident dolor proident in officia eu veniam. Ullamco ea magna fugiat adipisicing exercitation sint consequat eu aliqua magna occaecat anim enim. Veniam duis duis culpa enim quis ipsum.

            Minim dolore ullamco eiusmod labore elit eu aute qui proident ea anim deserunt labore ad. Nostrud quis et fugiat exercitation aliqua minim pariatur nisi minim eiusmod. Sit exercitation tempor anim do minim. Amet ad consectetur reprehenderit sunt magna tempor anim occaecat velit culpa. Exercitation dolor consectetur adipisicing reprehenderit.
		</>
	)
}