import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import Wrapper from '../assets/wrappers/ThemeToggle'
import { setDarkTheme } from '../store/dahsboard/dashboardReducer'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import { RootState } from '../store/rootReducer'

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const isDarkTheme = useSelector((state: RootState) => state.dashboard.isDarkTheme)
  const setDarkThemeHandler = () => {
    dispatch(setDarkTheme())
    const currentTheme = !isDarkTheme
    document.body.classList.toggle('dark-theme', currentTheme)
    localStorage.setItem('darkTheme', currentTheme.toString())
  }

  return (
    <Wrapper onClick={setDarkThemeHandler}>
      {isDarkTheme ? <BsFillSunFill /> : <BsFillMoonFill />}
    </Wrapper>
  )
}

export default ThemeToggle
