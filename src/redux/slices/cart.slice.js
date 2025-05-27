import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  counter: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1
    },
  },
})

export const { increment } = cartSlice.actions
export default cartSlice.reducer
