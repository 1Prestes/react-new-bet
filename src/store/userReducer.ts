import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from './store'
import createSession from '../Services/create-session'
import { createUser } from '../Services/server'

const initialState = {
  user: {},
  token: null,
  error: ''
}

const usersSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    REGISTER_USER (state, action) {
      const user = createUser(action.payload)

      if (user === 'E-mail exists') {
        return { ...state, user: {}, error: user }
      }
      return { ...state, user, error: '' }
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
