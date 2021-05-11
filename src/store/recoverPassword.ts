import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../Utils/axios-http-client'

interface ForgotPassword {
  email: string
  redirect_url: string
}

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: ForgotPassword) => {
    const response = await api.post('/passwords', data).then(res => res)
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
      console.log(action)
      return { ...state, error: '' }
    })

    builder.addCase(forgotPassword.rejected, (state, action) => {
      // let error = ''
      // if (action.error.message === 'Request failed with status code 401') {
      //   error = 'incorrect data'
      // }
      console.log(action)
      return { ...state, error: 'Not found.' }
    })
  }
})

export default recoverSlice.reducer
