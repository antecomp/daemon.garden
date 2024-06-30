import '@/styles/index.css'
import Desktop from './components/Util/Desktop/Desktop'

// Modal Imports
import { ModalContainer } from 'react-modal-global';
import Modal from "@/components/Util/Modal/Modal.jsx"
import "react-modal-global/styles/modal.scss" // Imports essential styles for `ModalContainer`.
import '@/styles/Util/Modal/ModalOverrides.css'
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/Util/Toastify/Toastify.css'

// Toastify imports (for notification)
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
//import OverlayScene from './components/OverlayScene/OverlayScene';
import Hermes from './components/Hermes/Hermes';
import useHermesStore from './stores/hermesStore';
import useDynamicHermesStore from './stores/dynamicHermesStore';
import HermesDynamic from './components/Hermes/HermesDynamic';
import generateSvalinnTree from './data/hermes_dynamic/svalinn';




function App() {


  // Automatically trigger game intro scene
  // TODO: cookie/zustand state for if you've already seen this :^)
/*   useEffect(() => {
    Modal.open(OverlayScene, {closable: false, file: `intro`})
  }) */


/*   const {initiateHermes, isActive: isHermesActive, currentDialogTree: currentHermesTree} = useHermesStore();

   useEffect(() => {
    setTimeout(() => {
      initiateHermes("hell")
    }, 1500)
  }, []) */

  const {initiateHermes, isActive: isHermesActive, currentCollection, closeHermes} = useDynamicHermesStore();

  useEffect(() => {
    setTimeout(() => {
      initiateHermes(generateSvalinnTree);
    })
  }, [])

  return (
    <>
      <Desktop/>
      <ModalContainer controller={Modal} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
        closeButton={false}
      />
      {/* Giving Hermes a key based on the current filename ensures itll completely remount when that changes. */}
      {/* {isHermesActive && currentHermesTree && <Hermes key={currentHermesTree?.filename}/>} */}

      {isHermesActive && currentCollection && <HermesDynamic key={"this will change"}/>}

    </>
  )
}

export default App
