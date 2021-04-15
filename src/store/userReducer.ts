import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from './store'
import { auth, createUser } from '../Services/FakeServer/server'
import { setCookie } from '../Services/storageCookie'

const initialState = {
  user: {},
  token: '',
  error: ''
}

const usersSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    REGISTER_USER (state, action) {
      const user = createUser(action.payload)
      if (user === 'E-mail exists') return { ...state, user: {}, error: user }

      setCookie('@AUTH_TOKEN', user.token)
      return { ...state, user: user.user, token: user.token, error: '' }
    },
    AUTH_USER (state, action) {
      const newAuth = auth(action.payload.login)
      if (newAuth === 'Incorrect data') return { ...state, error: newAuth, token: '' }

      setCookie('@AUTH_TOKEN', newAuth.token)
      return { ...state, user: newAuth.user, token: newAuth.token, error: '' }
    }
  }
})

export const { REGISTER_USER, AUTH_USER } = usersSlice.actions
export const user = (state: RootState): RootState => state
export default usersSlice.reducer