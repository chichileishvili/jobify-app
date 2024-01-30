import Wrapper from '../assets/wrappers/DashboardFormPage'
import { FormRow, FormRowSelect, ButtonBtn } from '.'
import { Form, useSubmit, Link } from 'react-router-dom'
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import { useAllJobsContext } from '../pages/AllJobs'
import React from 'react'


export enum Job_Status {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'competed',
}

export enum Job_Type {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  INTERNSHIP = 'internship',
}

export enum Job_Sort{ 
  NEWEST = 'newest',
  OLDEST = 'oldest',
  HIGHEST = 'highest',
  LOWEST = 'lowest'
}


export interface searchValues { 
  search: string
  jobStatus: Job_Status
  job: Job_Type
  sort: Job_Sort
}


const SearchCOntainer = () => {  
  const { searchValues } = useAllJobsContext() as { searchValues: searchValues }
  const { search, jobStatus, job, sort } = searchValues 
  const submit = useSubmit()
  const debounce = (onChange) => {
    let timeout
    return (e) => {
      const form = e.currentTarget.form
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        onChange(form)
      }, 2000)
    }
  }
  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'> search form</h5>

        <div className='form-center'>
          <FormRow
            type='search'
            name='search'
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form)
            })}
          />

          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            labelText='job type'
            name='job'
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={job}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            name='sort'
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            {' '}
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchCOntainer
