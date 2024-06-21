import React from 'react'
import '../styles/OpponentBar.css'
import profile from '../../assets/images/Profile_Icon.png'
const OpponentBar = () => {
  return (
    <div className='top-bar'>
      <button className='settings-button'></button>
      <div className='profile-icon-outer-container'>
        <div className='profile-icon-container'>
          <img className='profile-image' src={profile} alt='profile' />
        </div>
      </div>
      <button className='wifi-button'></button>
    </div>
  )
}

export default OpponentBar