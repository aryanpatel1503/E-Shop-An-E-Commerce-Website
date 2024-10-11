import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product_id === action.payload.product_id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        alert(
          `increased ${state.cartItems[itemIndex].product_title} cart quantity`
        );
        // toast.info(
        //   `increased ${state.cartItems[itemIndex].product_title} cart quantity`,
        //   {
        //     position: "bottom-left",
        //   }
        // );
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        alert(`${action.payload.product_title} added to cart`);
        // toast.success(`${action.payload.product_title} added to cart`, {
        //   position: "bottom-left",
        // });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.product_id !== action.payload.product_id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      alert(`${action.payload.product_title} removed from cart`);
      // toast.error(`${action.payload.product_title} removed from cart`, {
      //   position: "bottom-left",
      // });
    },
    decreaseCart(state, action) {
      const itemsIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.product_id === action.payload.product_id
      );

      if (state.cartItems[itemsIndex].cartQuantity > 1) {
        state.cartItems[itemsIndex].cartQuantity -= 1;
        // alert(`Decreased ${action.payload.product_title} cart quantity`);
        // toast.info(`Decreased ${action.payload.product_title} cart quantity`, {
        //   position: "bottom-left",
        // });
      } else if (state.cartItems[itemsIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.product_id !== action.payload.product_id
        );
        state.cartItems = nextCartItems;

        alert(`${action.payload.product_title} removed from cart`);
        // toast.error(`${action.payload.product_title} removed from cart`, {
        //   position: "bottom-left",
        // });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];
      alert(`Cart cleared`);
      // toast.error(`Cart cleared`, {
      //   position: "bottom-left",
      // });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { product_price, cartQuantity } = cartItem;
          const itemTotal = product_price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
