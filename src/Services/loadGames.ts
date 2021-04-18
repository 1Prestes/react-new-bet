import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async () => {
    const response = await fetch('http://localhost:8080/types', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(async response => {
      return await response.json()
    }).then(games => {
      return games
    })
    return response
  }
)
