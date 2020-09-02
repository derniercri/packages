import { createSlice } from '@reduxjs/toolkit'

const initialState = 0

type State = number

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state: State) => {
      return state + 1
    },
    decrement: (state: State) => {
      return state - 1
    },
  },
})

export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer
