import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart.slice";
import dataReducer from "./slices/data.slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    data: dataReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      inmmutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
