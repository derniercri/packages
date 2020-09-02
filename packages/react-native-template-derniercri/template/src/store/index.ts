import AsyncStorage from '@react-native-community/async-storage'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'

import reducer from './reducer'

const persistConfig = {
  key: 'HelloWorld',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = [...getDefaultMiddleware()]

if (__DEV__) {
  const createDebugger = require('redux-flipper').default
  middleware.push(createDebugger())
}

const store = configureStore({
  reducer: persistedReducer,
  devTools: __DEV__,
  middleware,
})

export const persistor = persistStore(store)

export type State = ReturnType<typeof store.getState>

export default store
