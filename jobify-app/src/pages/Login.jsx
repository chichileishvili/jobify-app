import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow } from '../components'

const Login = () => {
  return (
    <Wrapper>
      <form className='form'>
        <h4>Login</h4>
        <FormRow type='email' name='email' defaultValue='giorgi@gmail.com' />
        <FormRow type='password' name='Password' defaultValue='nanan123' />
        <button className='btn btn-block' type='submit'>
          Submit
        </button>
        <button className='btn btn-block' type='button'>
          Explore the app
        </button>
        <p>
          Not A Member?
          <Link to='/register' className='member-btn'>
            {' '}
            Register{' '}
          </Link>
        </p>
      </form>
    </Wrapper>
  )
}

export default Login
