import { combineReducers } from '@reduxjs/toolkit'
import { dashBoardReducer } from './dahsboard/dashboardReducer'

export const rootReducer = combineReducers({
  dashBoard: dashBoardReducer,
})
