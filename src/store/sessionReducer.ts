import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { removeCookie, setCookie } from '../Helpers'
import api from '../Utils/axios-http-client'

interface Login {
  email: string
  password: string
}

export const setAuth = createAsyncThunk(
  'session/setAuth',
  async (login: Login) => {
    const response = await api.post('/sessions', login)
    return response.data
  }
)

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    error: ''
  },
  reducers: {
    LOGOUT_USER (state) {
      removeCookie('@AUTH_TOKEN')
      return state
    },
    CLEAR_SESSION (state) {
      return { ...state, error: '' }
    }
  },
  extraReducers: builder => {
    builder.addCase(setAuth.fulfilled, (state, action) => {
      setCookie('@AUTH_TOKEN', action.payload.token)
      return { ...state, error: '' }
    })

    builder.addCase(setAuth.rejected, (state, action) => {
      let error = ''
      if (action.error.message === 'Request failed with status code 401') {
        error = 'Error, check the data and try again'
      }

      if (action.error.message === 'Network Error') {
        error =
          'Error connecting to the server, try again or wait a few minutes'
      }

      return { ...state, error: error }
    })
  }
})

export const { LOGOUT_USER, CLEAR_SESSION } = sessionSlice.actions
export default sessionSlice.reducer
