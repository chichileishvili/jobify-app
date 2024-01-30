import { ButtonBtn, FormRow } from '../components'
import customFetch from '../utils/customFetch'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useOutletContext } from 'react-router-dom'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import { Form, redirect } from 'react-router-dom'
import { FormRowSelect } from '../components'
import { toast } from 'react-toastify'

import React from 'react'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/jobs', data)
    toast.success('Job added successfuly')
    return redirect('/dashboard/all-jobs')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

export interface UserProps {
  _id: string
  name: string
  email: string
  location: string
  lastName: string
}

const AddJob = () => {
  const { user } = useOutletContext() as { user: UserProps }

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'> add job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' />
          <FormRow type='text' name='company' />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            labelText='job type'
            name='job'
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
          <ButtonBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddJob
