import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface NewUser {
  id: string
  email: string
  password: string
}

const initialState: NewUser = {
  id: '',
  email: '',
  password: ''
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    ADD_USER (state, action: PayloadAction<NewUser>) {
      state = action.payload
    }
  }
})

export const { ADD_USER } = registerSlice.actions
export const user = (state: RootState): RootState => state
export default registerSlice.reducer
