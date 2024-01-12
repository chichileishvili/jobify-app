import React from 'react'
import Wrapper from '../assets/wrappers/StatItem'

export interface StatItemProps {
  count: number
  title: string
  icon: React.ReactNode
  color: string // Add this line
  bcg: string // And this line
}

const StatItem: React.FC<StatItemProps> = ({ count, title, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  )
}

export default StatItem
