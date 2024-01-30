import { Outlet, useLoaderData, redirect, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSideBar, NavBar, SmallSideBar } from '../components'
import { createContext, useContext, useState } from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import React from 'react'

export const DashboardContext = createContext({})

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/user/current-user')
    return data
  } catch (error) {
    return redirect('/')
  }
}

export interface UserProps {
  _id: string
  name: string
  email: string
  location: string
  lastName: string
  role?: string
  avatar?: string
}
export interface DashboardProps {
  user: UserProps
  showSideBar: boolean
  toggleSidebar: () => void
  logoutUser: () => void
}

const Dashboard = ({}) => {
  const user = useLoaderData()
  const navigate = useNavigate()
  const [showSideBar, setShowSideBar] = useState(false)
  const toggleSidebar = () => {
    setShowSideBar(!showSideBar)
  }
  const logoutUser = async () => {
    navigate('/')
    await customFetch.get('/auth/logout')
    toast.success('logging out')
  }

  return (
    <DashboardContext.Provider value={{ logoutUser, user, showSideBar, toggleSidebar }}>
      <Wrapper>
        <main className='dashboard'>
          <SmallSideBar />
          <BigSideBar />
          <div>
            <NavBar />
            <div className='dashboard-page'>
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = (): DashboardProps =>
  useContext(DashboardContext) as DashboardProps

export default Dashboard
