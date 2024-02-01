import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IInitialStateUser } from './user.interface'
import { IUser } from '@/types/user.types'

const initialState: IInitialStateUser = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    removeUser: (state) => {
      state.user = null
    } 
  },
})

export const { saveUser, removeUser } = userSlice.actions
export default userSlice.reducer