import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../Utils/axios-http-client'
import { RootState } from './store'

export interface ICartItem {
  id: string
  game_id: number
  userId: string
  bet: number[]
  kindOfGame: string
  color: string
  price: number
  date: string
}

interface Checkout {
  token: string
  games: [
    {
      game_id: number
      bet: number[]
    }
  ]
}

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (token: string) => {
    api.defaults.headers.authorization = `Bearer ${token}`
    const response = await api.get('/games').then(res => res)
    return response.data
  }
)

export const checkoutGames = createAsyncThunk(
  'games/checkoutGames',
  async (data: Checkout) => {
    const { token, games } = data
    const bet = { bet: games }

    api.defaults.headers.authorization = `Bearer ${token}`
    const response = await api.post('/users/purchases', bet).then(res => res)
    return response.data
  }
)

export const fetchBets = createAsyncThunk(
  'games/fetchBets',
  async (token: string) => {
    api.defaults.headers.authorization = `Bearer ${token}`
    const response = await api.get('/users/purchases').then(res => res)
    return response.data
  }
)

const initialState = {
  games: [
    {
      id: 0,
      color: '',
      description: '',
      max_number: 0,
      min_cart_value: 0,
      price: 0,
      range: 0,
      type: ''
    }
  ],
  currentGame: {
    id: 0,
    color: '',
    description: '',
    max_number: 0,
    min_cart_value: 0,
    price: 0,
    range: 0,
    type: ''
  },
  cart: [],
  checkout: [],
  error: ''
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
        (cartItem: ICartItem) => cartItem.id !== action.payload
      )
      return { ...state, cart: newCart }
    },
    CLEAR_CART (state) {
      return { ...state, cart: [], error: '' }
    },
    CLEAR_DATA (state) {
      return {
        ...state,
        games: [
          {
            id: 0,
            color: '',
            description: '',
            max_number: 0,
            min_cart_value: 0,
            price: 0,
            range: 0,
            type: ''
          }
        ],
        currentGame: {
          id: 0,
          color: '',
          description: '',
          max_number: 0,
          min_cart_value: 0,
          price: 0,
          range: 0,
          type: ''
        },
        cart: [],
        checkout: []
      }
    }
  },
  extraReducers: build => {
    build.addCase(fetchGames.fulfilled, (state, action) => {
      return { ...state, games: action.payload, error: '' }
    })

    build.addCase(fetchGames.rejected, (state, action) => {
      if (action.error.message === 'Network Error') {
        state.error =
          'Error connecting to the server, try again or wait a few minutes'
      }
      return state
    })

    build.addCase(checkoutGames.fulfilled, state => {
      return state
    })

    build.addCase(checkoutGames.rejected, state => {
      return state
    })

    build.addCase(fetchBets.fulfilled, (state, action) => {
      return { ...state, checkout: action.payload }
    })

    build.addCase(fetchBets.rejected, state => {
      return state
    })
  }
})

export const {
  SET_CURRENT_GAME,
  ADD_BET_TO_CART,
  REMOVE_BET_OF_CART,
  CLEAR_CART,
  CLEAR_DATA
} = gamesSlice.actions
export const user = (state: RootState): RootState => state
export default gamesSlice.reducer
