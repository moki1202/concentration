import React from 'react'
import './styles/GameUi.css'
import Bar from './components/Bar'
import GameArea from './components/GameArea'
const GameUi: React.FC = () => {
  return (
    <div className='game-ui'>
      <Bar position='opponent' />
      <div className='canvas-wrapper'>
        <GameArea />
      </div>
      <Bar position='player' />
    </div>
  )
}

export default GameUi
