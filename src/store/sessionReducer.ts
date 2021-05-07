import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { removeCookie, setCookie } from '../Helpers'
import api from '../Utils/axios-http-client'

interface Login {
  email: string
  password: string
}

export const setAuth = createAsyncThunk(
  'user/setAuth',
  async (login: Login) => {
    const response = await api.post('/sessions', login).then(res => res)
    return response
  }
)

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    error: '',
    token: ''
  },
  reducers: {
    LOGOUT_USER (state) {
      removeCookie('@AUTH_TOKEN')
      return { ...state, token: '' }
    }
  },
  extraReducers: builder => {
    builder.addCase(setAuth.fulfilled, (state, action) => {
      setCookie('@AUTH_TOKEN', action.payload.data.token)
      return { ...state, token: action.payload.data.token, error: '' }
    })

    builder.addCase(setAuth.rejected, (state, action) => {
      let error = ''
      if (action.error.message === 'Request failed with status code 401') {
        error = 'incorrect data'
      }

      return { ...state, token: '', error: error }
    })
  }
})

export const { LOGOUT_USER } = sessionSlice.actions
export default sessionSlice.reducer
