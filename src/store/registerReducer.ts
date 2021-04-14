import { createSlice } from '@reduxjs/toolkit'

import createNewUser from '../Services/create-user'

import type { RootState } from './store'

const registerSlice = createSlice({
  name: 'register',
  initialState: [],
  reducers: {
    REGISTER_USER (state, action) {
      return state.concat(createNewUser(action.payload))
    }
  }
})

export const { REGISTER_USER } = registerSlice.actions
export const user = (state: RootState): RootState => state
export default registerSlice.reducer
