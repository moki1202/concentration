import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './style/winnerPage.css'

const WinnerPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { winner } = location.state as { winner: string }

  return (
    <div className='winner-page'>
      <div className='winner-container'>
        <h1 className='winner-text'>
          {winner === 'Tie' ? `It's a tie!` : `${winner} wins!`}
        </h1>
        <button className='play-again-button' onClick={() => navigate('/')}>
          Play Again
        </button>
      </div>
    </div>
  )
}

export default WinnerPage
