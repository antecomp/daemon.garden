import '@/styles/index.css'
import SimpleWindow from './components/Util/Desktop/SimpleWindow'
import IntroText from './placeholders/IntroText'

function App() {

  return (
    <>
      <h1>hi :D</h1>
      <div id="desktop">
          <SimpleWindow width='75ch' height='15px'>
            <IntroText/>
          </SimpleWindow>
      </div>
    </>
  )
}

export default App
