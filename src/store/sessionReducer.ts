import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../Utils/axios-http-client'

interface Login {
  email: string
  password: string
}

export const setAuth = createAsyncThunk(
  'user/setAuth',
  async (login: Login) => {
    const response = await axios.post('/sessions', login).then(res => res)
    return response
  }
)

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    error: '',
    token: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setAuth.fulfilled, (state, action) => {
      return { ...state, token: action.payload.data.token, error: '' }
    })

    builder.addCase(setAuth.rejected, (state, action) => {
      let error: any = action.error.message
      if (action.error.message === 'Request failed with status code 401') {
        error = 'incorrect data'
      }

      return { ...state, token: '', error: error }
    })
  }
})

export default sessionSlice.reducer
