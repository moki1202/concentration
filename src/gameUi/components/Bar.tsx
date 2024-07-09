import React from 'react'
import '../styles/Bar.css'
import profile from 'src/assets/images/gamescreen_images/profile_icon.png'
import setting_btn from 'src/assets/images/gamescreen_images/settings_icon.png'
import wifi_btn from 'src/assets/images/gamescreen_images/network_connection.png'
import knock_pass_btn from 'src/assets/images/gamescreen_images/knock_pass_button.png'

interface BarProps {
  position: 'player' | 'opponent'
}

const Bar: React.FC<BarProps> = ({ position }) => {
  return (
    <div className={`${position}-bar`}>
      <button className='settings-button'>
        <img className='setting-btn-image' src={setting_btn} alt='setting' />
      </button>
      <div className={`profile-${position}-icon-outer-container`}>
        <div className='profile-icon-container'>
          <img className='profile-image' src={profile} alt='profile' />
          {position === 'player' && (
            <div className='knock-pass-wrapper'>
              <img
                className='knock-pass-button'
                src={knock_pass_btn}
                alt='knock-pass'
              />
              <span className='knock-text'>Knock</span>
            </div>
          )}
        </div>
      </div>
      <button className='wifi-button'>
        <img className='wifi-btn-image' src={wifi_btn} alt='wifi' />
      </button>
    </div>
  )
}

export default Bar
