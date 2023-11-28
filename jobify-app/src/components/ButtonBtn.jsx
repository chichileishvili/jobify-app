import { useNavigation } from 'react-router-dom'

const ButtonBtn = ({ formBtn }) => {
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
