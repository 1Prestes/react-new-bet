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
    return response.data
  }
)

export const resetPassword = createAsyncThunk(
  'recover/resetPassword',
  async (newPassword: NewPassword) => {
    const response = await api.put('/passwords', newPassword)
    return response.data
  }
)

const recoverSlice = createSlice({
  name: 'recover',
  initialState: {
    error: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(forgotPassword.fulfilled, state => {
      return { ...state, error: '' }
    })

    builder.addCase(forgotPassword.rejected, (state, action) => {
      let error = ''
      if (action.error.message === 'Request failed with status code 404') {
        error = 'Email not found. Check the email provided and try again'
      }

      if (action.error.message === 'Network Error') {
        error =
          'Error connecting to the server, try again or wait a few minutes'
      }
      return { ...state, error: error }
    })

    builder.addCase(resetPassword.fulfilled, state => {
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
