import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../Utils/axios-http-client'
import { RootState } from './store'

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (token: string) => {
    api.defaults.headers.authorization = `Bearer ${token}`
    const response = await api.get('/games').then(res => res)
    return response
  }
)

interface CartItem {
  id: string
  userId: string
  bet: number[]
  kindOfGame: string
  color: string
  price: number
  date: string
}

const initialState = {
  games: [
    {
      color: '',
      description: '',
      'max-number': 0,
      'min-cart-value': 0,
      price: 0,
      range: 0,
      type: ''
    }
  ],
  currentGame: {
    color: '',
    description: '',
    'max-number': 0,
    'min-cart-value': 0,
    price: 0,
    range: 0,
    type: ''
  },
  cart: [],
  checkout: []
}

const gamesSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    SET_CURRENT_GAME (state, action) {
      return { ...state, currentGame: action.payload }
    },
    ADD_BET_TO_CART (state, action) {
      return { ...state, cart: state.cart.concat(action.payload) }
    },
    REMOVE_BET_OF_CART (state, action) {
      const newCart = state.cart.filter(
        (cartItem: CartItem) => cartItem.id !== action.payload
      )
      return { ...state, cart: newCart }
    },
    ADD_TO_CHECKOUT (state, action) {
      return { ...state, checkout: action.payload, cart: [] }
    }
  },
  extraReducers: build => {
    build.addCase(fetchGames.fulfilled, (state, action) => {
      console.log(action)
      return { ...state, games: action.payload.data }
    })

    build.addCase(fetchGames.rejected, (state, action) => {
      console.log(action)
      return state
      // return { ...state, games: action.payload }
    })
  }
})

export const {
  SET_CURRENT_GAME,
  ADD_BET_TO_CART,
  REMOVE_BET_OF_CART,
  ADD_TO_CHECKOUT
} = gamesSlice.actions
export const user = (state: RootState): RootState => state
export default gamesSlice.reducer
