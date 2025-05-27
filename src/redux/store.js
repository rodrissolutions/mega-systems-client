import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cart.slice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      inmmutableCheck: false,
      serializableCheck: false,
    }),
})

export default store
