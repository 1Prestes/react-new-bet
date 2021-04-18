import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from './store'

// interface Game {
//   color: string
//   description: string
//   'max-number': number
//   'min-cart-value': number
//   price: number
//   range: number
//   type: string
// }

// interface Games extends Game {
//   games: [{
//     color: string
//     description: string
//     'max-number': number
//     'min-cart-value': number
//     price: number
//     range: number
//     type: string
//   }]
// }

// interface CurrentGame extends Games {
//   currentGame: {
//     color: string
//     description: string
//     'max-number': number
//     'min-cart-value': number
//     price: number
//     range: number
//     type: string
//   }
// }

// interface Bet {
//   bet: [{
//     id: string
//     userId: string
//     bet: number[]
//     kindOfGame: string
//     color: string
//     price: number
//     date: string
//   }]
// }

const initialState = {
  games: [{
    color: '',
    description: '',
    'max-number': 0,
    'min-cart-value': 0,
    price: 0,
    range: 0,
    type: ''
  }],
  currentGame: {
    color: '',
    description: '',
    'max-number': 0,
    'min-cart-value': 0,
    price: 0,
    range: 0,
    type: ''
  },
  bet: []
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
    },
    ADD_NUMBER_OF_BET (state, action) {
      return { ...state, bet: state.bet.concat(action.payload) }
    },
    REMOVE_NUMBER_OF_BET (state, action) {
      return { ...state, bet: action.payload }
    }
  }
})

export const { LOAD_GAMES, SET_CURRENT_GAME, ADD_NUMBER_OF_BET, REMOVE_NUMBER_OF_BET } = gamesSlice.actions
export const user = (state: RootState): RootState => state
export default gamesSlice.reducer
