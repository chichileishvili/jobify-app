import { Outlet, useLoaderData, redirect, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSideBar, NavBar, SmallSideBar } from '../components'
import { createContext, useContext, useState } from 'react'
import { checkDefaultTheme } from '../App'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { setDarkTheme } from '../store/dahsboard/dashboardReducer'
import { useDispatch, useSelector } from 'react-redux'

const DashboardContext = createContext()

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/user/current-user')
    return data
  } catch (error) {
    return redirect('/')
  }
}

const Dashboard = ({}) => {
  const { user } = useLoaderData()
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

export const useDashboradContext = () => useContext(DashboardContext)
export default Dashboard
