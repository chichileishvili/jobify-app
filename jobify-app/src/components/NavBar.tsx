import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft } from 'react-icons/fa'
import Logo from './Logo'
import LogoutContainer from './LogoutContainer'
import ThemeToggle from './ThemeToggle'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSideBar } from '../store/dahsboard/dashboardReducer'
import React from 'react'

const NavBar = () => {
  const dispatch = useDispatch()
  const toggleNavSideBar = () => {
    dispatch(toggleSideBar())
  }

  return (
    <Wrapper>
      <div className='nav-center'>
        <button className='toggle-btn' type='button' onClick={toggleNavSideBar}>
          {' '}
          <FaAlignLeft />
        </button>
        <div>
          {' '}
          <Logo />
          <h4 className='logo-text'> dashboard</h4>
        </div>
        <div className='btn-container'>
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  )
}

export default NavBar
