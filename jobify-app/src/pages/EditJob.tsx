import { ButtonBtn, FormRow, FormRowSelect } from '../components'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useLoaderData, useParams } from 'react-router-dom'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import { Form, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import React from 'react'
import { JobProps } from '../components/Job'

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`)
    return data
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return redirect('/dashboard/all-jobs')
  }
}
export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const jobId = params.id

  try {
    await customFetch.patch(`/jobs/${jobId}`, data)
    toast.success('Job changed succesfuly')
    return redirect('/dashboard/all-jobs')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const EditJob = () => {
  const { job } = useLoaderData() as { job: JobProps }

  return (
    <Wrapper>
      <Form method='patch' className='form'>
        <h4 className='form-title'> editjob</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' defaultValue={job.position} />
          <FormRow type='text' name='company' defaultValue={job.company} />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            labelText='job type'
            name='job'
            defaultValue={job.job}
            list={Object.values(JOB_TYPE)}
          />
          <ButtonBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}
export default EditJob
