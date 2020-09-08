const generateFeature = () => `import { createSlice } from "@reduxjs/toolkit";

import { State } from "../index";

const initialState: number = 0;

type CounterState = typeof initialState;

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state: CounterState) => {
      state += 1;
    },
    decrement: (state: CounterState) => {
      state -= 1;
    },
  },
});

export const getCounter = (state: State) => state.counter;

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
`;

export default generateFeature;
