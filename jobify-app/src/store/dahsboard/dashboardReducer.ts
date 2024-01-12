import { createSlice } from '@reduxjs/toolkit'

const getInitialTheme = (): boolean => {
  const storedTheme = localStorage.getItem('darkTheme')
  return storedTheme ? JSON.parse(storedTheme) : false
}

export interface DashBoardState {
  isDarkTheme: boolean
  sideBar: boolean
}

const INITIAL_STATE: DashBoardState = {
  isDarkTheme: getInitialTheme(),
  sideBar: false,
}

export const dashBoardSlice = createSlice({
  name: 'dashboard',
  initialState: INITIAL_STATE,
  reducers: {
    setDarkTheme(state) {
      state.isDarkTheme = !state.isDarkTheme
      // Move localStorage operations outside the reducer
    },
    toggleSideBar(state) {
      state.sideBar = !state.sideBar
    },
  },
})

export const { setDarkTheme, toggleSideBar } = dashBoardSlice.actions

export const dashBoardReducer = dashBoardSlice.reducer
