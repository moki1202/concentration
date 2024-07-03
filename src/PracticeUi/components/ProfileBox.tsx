import React from 'react'
import '../styles/ProfileBox.scss'

interface ProfileBoxProps {
  imageUrl: string
  label: string
}

const ProfileBox: React.FC<ProfileBoxProps> = ({ imageUrl, label }) => {
  return (
    <div className='profile-box'>
      <img
        src={imageUrl}
        alt={label}
        className='profile-image'
        width={80}
        height={80}
      />
      <div className='profile-label'>{label}</div>
    </div>
  )
}

export default ProfileBox
