import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from './store'
import { auth, createUser } from '../Services/FakeServer/server'

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
      const newAuth = auth(action.payload.login)

      if (newAuth === 'Incorrect data') {
        return { ...state, error: newAuth, token: null }
      }
      return { ...state, user: newAuth.user, token: newAuth.token, error: '' }
    }
  }
})

export const { REGISTER_USER, AUTH_USER } = usersSlice.actions
export const user = (state: RootState): RootState => state
export default usersSlice.reducer
