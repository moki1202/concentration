import { Stage } from '@pixi/react'
import '@pixi/events'

import GraphicDemo from './examples/GraphicDemo'
import SpriteDemo from './examples/SpriteDemo/SpriteDemo'
import ErrorBoundary from './ErrorBoundary'
import Game from './Game/Game'
import './App.css'
import PattePePatta from './PattePePatta/PattePePatta'
import Concentration from './Concentration/Concentration'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WinnerPage from './Concentration/WinnerPage'

const config = {
  size: { width: window.innerWidth, height: window.innerHeight },
  spring: { mass: 10, tension: 1000, friction: 100 },
  stage: { antialias: true, backgroundColor: 0x1099bb },
}

const App = () => {
  //   return (
  //     <ErrorBoundary>
  //       <Stage {...config.size} options={config.stage}>
  //         {/* <GraphicDemo /> */}

  //         {/* <SpriteDemo /> */}

  //       </Stage>
  //     </ErrorBoundary>
  //   );

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path='/' element={<Concentration />} />
          <Route path='/winner' element={<WinnerPage />} />
          {/* <Game /> */}
          {/* <PattePePatta /> */}
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
