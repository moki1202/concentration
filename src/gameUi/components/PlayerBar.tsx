import React from 'react'
import '../styles/OpponentBar.css'
import profile from '../../assets/images/Profile_Icon.png'
import setting_btn from '../../assets/images/Settings Icon.png'
import wifi_btn from '../../assets/images/Network_Connection.png'
import knock_pass_btn from '../../assets/images/Knock & Pass Button.png'
const PlayerBar = () => {
  return (
   
        <div className='player-bar'>
            <div className='score-container'>
                
            </div>
        <button className='settings-button'>
            <img className='setting-btn-image' src={setting_btn} alt='setting' />
        </button>
        <div className='knock-pass-outer-container'>
            <div className='profile-icon-container'>
            <img className='profile-image' src={profile} alt='profile' />
            <div className='knock-pass-wrapper'>
                <img className='knock-pass-button' src={knock_pass_btn} alt='knock-pass' />
                <span className='knock-text'>Knock</span>
            </div>
            </div>
        </div>
        <button className='wifi-button'>
            <img className='wifi-btn-image' src={wifi_btn} alt='setting' />
        </button>
        </div>
  )
}

export default PlayerBar