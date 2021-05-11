import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../Utils/axios-http-client'

interface ForgotPassword {
  email: string
  redirect_url: string
}

interface NewPassword {
  token: string
  password: string
  password_confirmation: string
}

export const forgotPassword = createAsyncThunk(
  'recover/forgotPassword',
  async (data: ForgotPassword) => {
    const response = await api.post('/passwords', data).then(res => res)
    return response
  }
)

export const resetPassword = createAsyncThunk(
  'recover/resetPassword',
  async (newPassword: NewPassword) => {
    const response = await api.put('/passwords', newPassword).then(res => res)
    return response
  }
)

const recoverSlice = createSlice({
  name: 'recover',
  initialState: {
    error: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      return { ...state, error: '' }
    })

    builder.addCase(forgotPassword.rejected, (state, action) => {
      return { ...state, error: 'Not found.' }
    })

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      return { ...state, error: '' }
    })

    builder.addCase(resetPassword.rejected, (state, action) => {
      let error = 'Something went wrong, please try again'
      if (action.error.message === 'Request failed with status code 400') {
        error = 'Invalid token'
      }

      return { ...state, error }
    })
  }
})

export default recoverSlice.reducer
