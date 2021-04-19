import { createSlice } from '@reduxjs/toolkit'

// import type { RootState } from './store'
import { auth, createUser } from '../Services/FakeServer/server'
import { setCookie } from '../Services/storageCookie'

interface User {
  user: any
}

interface InitialState extends User {
  token: string
  error: string
}

const initialState: InitialState = {
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
    },
    LOGOUT_USER (state) {
      return { ...state, user: {}, token: '', error: '' }
    }
  }
})

export const { REGISTER_USER, AUTH_USER, LOGOUT_USER } = usersSlice.actions
// export const user = (state: RootState): RootState => state
export default usersSlice.reducer
