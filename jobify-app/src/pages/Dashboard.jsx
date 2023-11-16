import { Outlet } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSideBar, NavBar, SmallSideBar } from '../components'
import { createContext, useContext, useState } from 'react'
import { checkDefaultTheme } from '../App'

const DashboardContext = createContext()

const Dashboard = ({}) => {
  const user = { name: 'john' }
  const [showSideBar, setShowSideBar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme)

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    document.body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }
  const toggleSidebar = () => {
    setShowSideBar(!showSideBar)
  }
  const logoutUser = async () => {
    console.log('logout user')
  }

  return (
    <DashboardContext.Provider
      value={{ logoutUser, rtoggleDarkTheme, toggleSidebar, user, showSideBar, isDarkTheme }}>
      <Wrapper>
        <main className='dashboard'>
          <SmallSideBar />
          <BigSideBar />
          <div>
            <NavBar />
            <div className='dashboard-page'>
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboradContext = () => useContext(DashboardContext)
export default Dashboard
