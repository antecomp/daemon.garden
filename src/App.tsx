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




function App() {


  // Automatically trigger game intro scene
  // TODO: cookie/zustand state for if you've already seen this :^)
/*   useEffect(() => {
    Modal.open(OverlayScene, {closable: false, file: `intro`})
  }) */


  const {initiateHermes} = useHermesStore();

   useEffect(() => {
    setTimeout(() => {
      initiateHermes("hell")
    }, 1500)
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
      <Hermes/>
    </>
  )
}

export default App
