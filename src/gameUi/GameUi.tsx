import React from 'react'
import './styles/GameUi.css'
import CanvasArea from './components/CanvasArea'
import OpponentBar from './components/OpponentBar'
import PlayerBar from './components/PlayerBar'
const GameUi: React.FC = () => {
  return (
    <div className='game-ui'>
      <OpponentBar />
      <div className='canvas-wrapper'>
        <CanvasArea />
      </div>
      <PlayerBar />
    </div>
  )
}

export default GameUi
