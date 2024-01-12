import React from 'react'
import Wrapper from '../assets/wrappers/JobInfo'

export interface JobInfoProps {
  icon: JSX.Element
  text: string
}

const JobInfo = ({ icon, text }: JobInfoProps) => {
  return (
    <Wrapper>
      <span className='job-icon'> {icon}</span>
      <span className='job-text'>{text}</span>
    </Wrapper>
  )
}

export default JobInfo
