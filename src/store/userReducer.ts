import { createSlice } from '@reduxjs/toolkit'

// import type { RootState } from './store'
// import { auth, createUser } from '../Helpers/FakeServer/server'
// import { removeCookie, setCookie } from '../Helpers/storageCookie'

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
      // const user = createUser(action.payload)
      // if (user === 'E-mail exists') return { ...state, user: {}, error: 'This email has being used' }

      // setCookie('@AUTH_TOKEN', user.token)
      // return { ...state, user: user.user, token: user.token, error: '' }
      return state
    },
    AUTH_USER (state, action) {
      // const newAuth = auth(action.payload.login)
      // if (newAuth === 'Incorrect data') return { ...state, error: newAuth, token: '' }

      // setCookie('@AUTH_TOKEN', newAuth.token)
      // return { ...state, user: newAuth.user, token: newAuth.token, error: '' }
      return state
    }
    // LOGOUT_USER (state) {
    //   removeCookie('@AUTH_TOKEN')
    //   return { ...state, user: {}, token: '', error: '' }
    // }
  }
})

export const { REGISTER_USER, AUTH_USER } = usersSlice.actions
// export const user = (state: RootState): RootState => state
export default usersSlice.reducer
