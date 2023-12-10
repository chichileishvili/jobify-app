import { createSlice } from '@reduxjs/toolkit'

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem('darkTheme')
  return storedTheme ? JSON.parse(storedTheme) : false
}
const INITIAL_STATE = {
  isDarkTheme: getInitialTheme(),
  sideBar: false,
}

export const dashBoardSlice = createSlice({
  name: 'dashboard',
  initialState: INITIAL_STATE,
  reducers: {
    setDarkTheme(state) {
      state.isDarkTheme = !state.isDarkTheme
      localStorage.setItem('darkTheme', state.isDarkTheme)
    },
    toggleSideBar(state) {
      state.sideBar = !state.sideBar
    },
  },
})
export const { setDarkTheme, toggleSideBar } = dashBoardSlice.actions

export const dashBoardReducer = dashBoardSlice.reducer
