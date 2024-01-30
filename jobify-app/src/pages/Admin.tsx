import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa'
import { useLoaderData, redirect } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import Wrapper from '../assets/wrappers/StatsContainer'
import { toast } from 'react-toastify'
import { StatItem } from '../components'
import React from 'react'

export const loader = async () => {
  try {
    const response = await customFetch.get('/user/admin/app-stats')
    return response.data
  } catch (error) {
    toast.error('you arent authorized to view this page')
    return redirect('/dashboard')
  }
}
export interface AdminProps {
  users: number
  jobs: number
}

const Admin = () => {
  const { users, jobs } = useLoaderData() as AdminProps
  return (
    <Wrapper>
      <StatItem
        title='current users'
        count={users}
        color='#e9b949'
        bcg='#fcefct'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='total jobs'
        count={jobs}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  )
}

export default Admin
