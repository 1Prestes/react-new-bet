import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../Utils/axios-http-client'

// import type { RootState } from './store'
// import { auth, createUser } from '../Helpers/FakeServer/server'
// import { removeCookie, setCookie } from '../Helpers/storageCookie'

const initialState = {
  error: '',
  user: {
    username: '',
    email: ''
  }
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (token: string) => {
    api.defaults.headers.authorization = `Bearer ${token}`

    const response = await api.get('/users/user').then(res => res)
    return response
  }
)

export const createUser = createAsyncThunk(
  'user/setAuth',
  async (data: object) => {
    const response = await api.post('/users', data).then(res => res)
    return response
  }
)

const usersSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createUser.fulfilled, state => {
      return { ...state, error: '' }
    })

    builder.addCase(createUser.rejected, (state, action) => {
      let error = ''
      if (action.error.message === 'Request failed with status code 400') {
        error = 'E-mail already registered'
      }
      return { ...state, error: error }
    })

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      const { username, email } = action.payload.data
      return { ...state, user: { username, email } }
    })

    builder.addCase(fetchUser.rejected, (state, action) => {
      console.log(action)
      return state
    })
  }
})

// export const { AUTH_USER } = usersSlice.actions
// export const user = (state: RootState): RootState => state
export default usersSlice.reducer
