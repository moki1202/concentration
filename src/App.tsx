import '@pixi/events'

import ErrorBoundary from './ErrorBoundary'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GinRummy from './GinRummy/GinRummy'
import GameUi from './gameUi/GameUi'
import CanvasArea from './gameUi/components/CanvasArea'

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
          <Route path='/' element={<GameUi />} />
          {/* <Route path='/' element={<Concentration />} />
          <Route path='/winner' element={<WinnerPage />} /> */}
          {/* <Game /> */}
          {/* <Route path='/' element={<PattePePatta />} /> */}
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
