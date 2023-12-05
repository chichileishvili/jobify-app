import { Form, redirect, useNavigation, Link, useActionData, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { ButtonBtn, FormRow } from '../components'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const errors = { msg: '' }
  if (data.password.length < 3) {
    errors.msg = 'password is too short'
    return errors
  }

  try {
    await customFetch.post('/auth/login', data)
    toast.success('Login succesfull')
    return redirect('/dashboard')
  } catch (error) {
    errors.msg = error?.response?.data?.msg
    return error
  }
}

const Login = () => {
  const navigate = useNavigate()

  const loginDemoUser = async () => {
    const data = {
      email: 'test.user@example.com',
      password: 'TestPassword123!',
    }

    try {
      await customFetch.post('/auth/login', data)
      toast.success('take a test drive')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4>Login</h4>
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <ButtonBtn />
        <button className='btn btn-block' type='button' onClick={loginDemoUser}>
          Explore the app
        </button>
        <p>
          Not A Member?
          <Link to='/register' className='member-btn'>
            {' '}
            Register{' '}
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
