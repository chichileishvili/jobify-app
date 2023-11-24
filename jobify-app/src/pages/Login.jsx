import { Form, redirect, useNavigation, Link, useActionData } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow } from '../components'
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
  const errors = useActionData()
  const navigation = useNavigation()
  const isSubmiting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4>Login</h4>
        {errors?.msg && <p style={{ color: 'red' }}>{errors.msg} </p>}
        <p></p>
        <FormRow type='email' name='email' defaultValue='giorgi@gmail.com' />
        <FormRow type='password' name='password' defaultValue='nanan123' />
        <button className='btn btn-block' type='submit'>
          {isSubmiting ? 'submiting...' : 'submit'}
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
      </Form>
    </Wrapper>
  )
}

export default Login
