import React from 'react'
import './styles/GameUi.css'
import CanvasArea from './components/CanvasArea'
import Bar from './components/Bar'
const GameUi: React.FC = () => {
  return (
    <div className='game-ui'>
      <Bar position="opponent" />
      <div className='canvas-wrapper'>
        <CanvasArea />
      </div>
      <Bar position="player" />
    </div>
  )
}

export default GameUi
