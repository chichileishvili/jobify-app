import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { redirect } from 'react-router-dom'
import React from 'react'

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`)
    toast.success('Jobs has been deleted')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
  }
  return redirect('/dashboard/all-jobs')
}
