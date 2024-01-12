import { combineReducers } from '@reduxjs/toolkit'
import { dashBoardReducer } from './dahsboard/dashboardReducer'

export const rootReducer = combineReducers({
  dashboard: dashBoardReducer,
})

export type RootState = ReturnType<typeof rootReducer>
