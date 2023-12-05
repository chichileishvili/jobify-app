import { useState, useEffect } from 'react'
import { Logo, FormRow, Alert, ButtonBtn } from '../components'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Form, redirect, Link } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/register', data)
    toast.success('Registration succesfull')
    return redirect('/login')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
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
