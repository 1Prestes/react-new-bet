import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../Utils/axios-http-client'

// import type { RootState } from './store'
// import { auth, createUser } from '../Helpers/FakeServer/server'
// import { removeCookie, setCookie } from '../Helpers/storageCookie'

const initialState = {
  error: ''
}

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
  reducers: {
    // LOGOUT_USER (state) {
    //   removeCookie('@AUTH_TOKEN')
    //   return { ...state, user: {}, token: '', error: '' }
    // }
  },
  extraReducers: builder => {
    builder.addCase(createUser.fulfilled, (state, payload) => {
      return { ...state, error: '' }
    })

    builder.addCase(createUser.rejected, (state, payload) => {
      let error = ''
      if (payload.error.message === 'Request failed with status code 400') {
        error = 'E-mail already registered'
      }
      return { ...state, error: error }
    })
  }
})

// export const { AUTH_USER } = usersSlice.actions
// export const user = (state: RootState): RootState => state
export default usersSlice.reducer
