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
    const response = await api.post('/sessions', login).then(res => res)
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
        error = 'incorrect data'
      }

      return { ...state, error: error }
    })
  }
})

export const { LOGOUT_USER } = sessionSlice.actions
export default sessionSlice.reducer
