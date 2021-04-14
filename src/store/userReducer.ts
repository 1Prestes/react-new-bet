import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from './store'
import createNewUser from '../Services/create-user'
import createSession from '../Services/create-session'

const usersSlice = createSlice({
  name: 'register',
  initialState: [],
  reducers: {
    REGISTER_USER (state, action) {
      return state.concat(createNewUser(action.payload))
    },
    AUTH_USER (state, action) {
      createSession(action.payload)
      return state
    }
  }
})

export const { REGISTER_USER, AUTH_USER } = usersSlice.actions
export const user = (state: RootState): RootState => state
export default usersSlice.reducer
