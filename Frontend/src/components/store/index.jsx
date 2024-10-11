import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { getTotals } from "../redux/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

store.dispatch(getTotals());
