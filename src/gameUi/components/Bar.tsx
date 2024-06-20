import React from 'react'
import '../styles/Bar.css'

interface BarProps {
  position: 'top' | 'bottom'
  children: React.ReactNode
}

const Bar: React.FC<BarProps> = ({ position, children }) => {
  return <div className={`bar ${position}-bar`}>{children}</div>
}

export default Bar
