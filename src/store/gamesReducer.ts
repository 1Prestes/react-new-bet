import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from './store'

interface Game {
  games: [
    {
      color: string
      description: string
      'max-number': number
      'min-cart-value': number
      price: number
      range: number
      type: string
    }
  ]
}

interface Games extends Game {
  currentGame: string
}

const initialState: Games = {
  games: [{
    color: '',
    description: '',
    'max-number': 0,
    'min-cart-value': 0,
    price: 0,
    range: 0,
    type: ''
  }],
  currentGame: ''
}

const gamesSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    LOAD_GAMES (state, action) {
      return { ...state, games: action.payload }
    },
    SET_CURRENT_GAME (state, action) {
      return { ...state, currentGame: action.payload }
    }
  }
})

export const { LOAD_GAMES, SET_CURRENT_GAME } = gamesSlice.actions
export const user = (state: RootState): RootState => state
export default gamesSlice.reducer
