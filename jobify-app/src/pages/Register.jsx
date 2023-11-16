import { useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Link } from 'react-router-dom'

// const initialState = {
//   name: '',
//   email: '',
//   password: '',
//   isMember: true,
//   showAlert: false,
// }

const Register = () => {
  // const [values, setValues] = useState(initialState)

  // const toggleMember = () => {
  //   setValues({ ...values, isMember: !values.isMember })
  // }

  // const handleChange = (e) => {
  //   console.log(e.target)
  // }
  // const onSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(e.target)
  // }

  return (
    <Wrapper className='full-page'>
      <form className='form'>
        <Logo />
        <h3> Register</h3>
        <Alert />

        <FormRow type='text' name='Name' defaultValue=' gela' />
        <FormRow type='text' name='last name' defaultValue='nela' labelText='last name' />

        <FormRow type='email' name='Email' defaultValue='Giorgi@gmail.com' />
        <FormRow type='text' name='Location' defaultValue='tbilisi' />

        <FormRow type='password' name='Password' defaultValue='nanan123' />
        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <p>
          Already a member?
          <Link className='member-btn' to='/login'>
            {' '}
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
