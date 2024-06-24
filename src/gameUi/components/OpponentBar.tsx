import React from 'react'
import '../styles/OpponentBar.css'
import profile from '../../assets/images/Profile_Icon.png'
import setting_btn from '../../assets/images/Settings Icon.png'
import wifi_btn from '../../assets/images/Network_Connection.png'
const OpponentBar = () => {
  return (
    <div className='opponent-bar'>
      <button className='settings-button'>
        <img className='setting-btn-image' src={setting_btn} alt='setting' />
      </button>
      <div className='profile-icon-outer-container'>
        <div className='profile-icon-container'>
          <img className='profile-image' src={profile} alt='profile' />
        </div>
      </div>
      <button className='wifi-button'>
        <img className='wifi-btn-image' src={wifi_btn} alt='setting' />
      </button>
    </div>
  )
}

export default OpponentBar