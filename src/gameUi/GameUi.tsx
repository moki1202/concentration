import React from 'react'
import './styles/GameUi.css'
import CanvasArea from './components/CanvasArea'
import profile from '../assets/profile.png'
import OpponentBar from './components/OpponentBar'
const GameUi: React.FC = () => {
  return (
    <div className='game-ui'>
      {/* <div className='top-bar'>
        <button className='settings-button'></button>
        <div className='profile-icon-outer-container'>
          <div className='profile-icon-container'>
            <img className='profile-image' src={profile} alt='profile' />
          </div>
        </div>
        <button className='wifi-button'></button>
      </div> */}
      <OpponentBar />
      <div className='canvas-wrapper'>
        <CanvasArea />
      </div>
      <div className='score-bar-container'>
        <div className='score-bar'>
          <div className='card-type'>Deadwood</div>
          <div className='score'>Score</div>
        </div>
      </div>
      <div className='bottom-bar'>
        <button className='settings-button'></button>
        <div className='knock-container-outer'></div>
        <div className='knock-container'>
          <span className='knock-text'>Knock</span>
        </div>
        <button className='wifi-button'></button>
      </div>
    </div>
  )
}

export default GameUi
