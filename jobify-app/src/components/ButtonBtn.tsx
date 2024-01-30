import { useNavigation } from 'react-router-dom'
import React from 'react'

export interface ButtonBtnProps {
  formBtn?: boolean
}

const ButtonBtn = ({ formBtn }: ButtonBtnProps) => {
  const navigation = useNavigation()
  const isSubmiting = navigation.state === 'submitting'

  return (
    <button
      type='submit'
      className={`btn btn-block ${formBtn && 'form-btn'}`}
      disabled={isSubmiting}>
      {isSubmiting ? 'submiting...' : 'Submit'}
    </button>
  )
}

export default ButtonBtn
