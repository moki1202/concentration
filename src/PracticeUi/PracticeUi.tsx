import React from 'react'
import './styles/PracticeUi.scss'
import cardIcon from '../assets/ui-practice/credit-card.svg'
import commonLogo from '../assets/profile.png'
import _ from 'lodash'
import ProfileBox from './components/ProfileBox'
import profilePic from '../assets/back.png'

const menuOptions: {
  icon: string
  label: string
}[] = [
  { icon: commonLogo, label: 'Home' },
  { icon: commonLogo, label: 'Accounts' },
  { icon: commonLogo, label: 'Cards' },
  { icon: commonLogo, label: 'Payments' },
  { icon: commonLogo, label: 'My Stats' },
  { icon: commonLogo, label: 'Teams' },
  { icon: commonLogo, label: 'Settings' },
]

const helpOptions: {
  icon: string
  label: string
}[] = [
  { icon: commonLogo, label: 'Help Center' },
  { icon: commonLogo, label: 'Log Out' },
]

const PracticeUi: React.FC = () => {
  return (
    <>
      <div className='main-container'>
        <div className='navbar-container'>
          <div className='icon-tab'>
            <div className='header-icon'>
              <img src={commonLogo} height={40} width={40} />
            </div>
            <div className='items-icon'>
              <div className='options-icon'>
                {menuOptions.map((option, index) => (
                  <img
                    key={index}
                    src={option.icon}
                    className='menu-icon'
                    alt='icon-name'
                    height={25}
                    width={25}
                  />
                ))}
              </div>
              <div className='help-center-icon'>
                {helpOptions.map((option, index) => (
                  <img
                    key={index}
                    src={option.icon}
                    className='menu-icon'
                    alt='icon-name'
                    height={25}
                    width={25}
                  />
                ))}
              </div>
            </div>
            <div className='profile-icon'>
              <img src={commonLogo} alt='common-logo' height={30} width={30} />
            </div>
          </div>
          <div className='menu-tab'>
            <span className='menu-header'>M.Pact</span>
            <div className='menu-items'>
              <div className='options'>
                {menuOptions.map((option, index) => (
                  <div key={index} className='menu-item'>
                    {option.label}
                  </div>
                ))}
              </div>
              <div className='help-center'>
                {helpOptions.map((option, index) => (
                  <div key={index} className='help-item'>
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
            <div className='menu-profile'>
              <span>Tom Holland</span>
              <span>example.com</span>
            </div>
          </div>
        </div>
        <div className='transaction-container'>
          <div className='card-info'>
            <div className='card-heading'>Your Cards</div>
            <img src={cardIcon} alt='credit-card' className='card-icon' />
            <div className='credit-details-container'>
              {_.times(2, (i) => (
                <div key={i} className='credit-detail'>
                  <span className='credit-detail-text'>Dummy Text</span>
                </div>
              ))}
            </div>
          </div>
          <div className='quick-transaction'>
            <span className='quick-transaction-header'>Quick Transaction</span>
            <div className='profile-container'>
              {_.times(3, (i) => (
                <ProfileBox key={i} label='Helen' imageUrl={profilePic} />
              ))}
            </div>
          </div>
        </div>
        <div className='info-container'>
          <div className='subscription'>
            <div className='subscription-header'>
              <span className='subscription-text'>Subscriptions</span>
              <button className='manage-button'>Manage</button>
            </div>
            <div className='sub-card-info'></div>
          </div>
          <div className='spending-limit'>
            <div className='limit-header'></div>
            <div className='daily-limit'></div>
          </div>
          <div className='issue-access'>
            <div className='issue-access-header'></div>
            <div className='issue-access-info'></div>
          </div>
          <div className='recent-transaction'>
            <div className='recent-transaction-header'></div>
            <div className='recent-transaction-desc'></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PracticeUi
