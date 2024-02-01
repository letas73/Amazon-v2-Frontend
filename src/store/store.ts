import { configureStore } from '@reduxjs/toolkit'
import user from './user/user'
import filters from './filters/filters'

export const store = configureStore({
  reducer: {
    user,
    filters
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch