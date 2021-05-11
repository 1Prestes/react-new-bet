import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userReducer'
import gamesReducer from './gamesReducer'
import sessionReducer from './sessionReducer'
import recoverReducer from './recoverPassword'

export const store = configureStore({
  reducer: {
    user: userReducer,
    games: gamesReducer,
    session: sessionReducer,
    password: recoverReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
