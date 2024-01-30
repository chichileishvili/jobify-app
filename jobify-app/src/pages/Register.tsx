import { Logo, FormRow, ButtonBtn } from '../components'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Form, redirect, Link } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import React from 'react'
import { ErrorResponse } from './Login'

export interface RegisterProps {
  name: string
  lastName: string
  email: string
  location: string
  password: string
  formData: () => FormData
}

export const action = async ({ request }: { request: RegisterProps }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/register', data)
    toast.success('Registration succesfull')
    return redirect('/login')
  } catch (error) {
    toast.error((error as ErrorResponse).response?.data?.msg)
    return error
  }
}

const Register = () => {
  return (
    <Wrapper className='full-page'>
      <Form method='post' className='form'>
        <Logo />
        <h3> Register</h3>

        <FormRow type='text' name='name' />
        <FormRow type='text' name='lastName' labelText='last name' />

        <FormRow type='email' name='email' />
        <FormRow type='text' name='location' />

        <FormRow type='password' name='password' />
        <ButtonBtn />
        <p>
          Already a member?
          <Link className='member-btn' to='/login'>
            {' '}
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register
