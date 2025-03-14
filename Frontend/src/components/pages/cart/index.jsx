import React, { useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../redux/cartSlice";
import Layout from "../../app/Layout";
import { toast } from "react-toastify";
import ProductListComponent from "../../app/ProductListComponent";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currency = "₹";

  const handleCheckout = () => {
    if (cart.cartItems.length > 0) {
      // navigate("/checkout", { state: { id: cart.cartItems[0].product_id } });
      navigate("/checkout", {
        state: { from: "cart" },
      });
    } else {
      toast.error("There are no items in the cart.", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleClearCart = (cartItem) => {
    dispatch(clearCart(cartItem));
  };

  return (
    <>
      <Layout>
        <div className="md:mx-container my-10 md:my-16 bg-white">
          <section className="px-4">
            <h3 className="text-3xl mb-7 text-center">Cart</h3>

            <ProductListComponent
              data={cart.cartItems}
              handleIncreaseItem={handleIncreaseCart}
              handleDecreaseItem={handleDecreaseCart}
              handleRemoveItem={handleRemoveFromCart}
              handleClearItems={handleClearCart}
              from="cart"
            />

            <div className="flex justify-end">
              <div className="w-full md:w-5/12 lg:w-4/12">
                <div className="border border-orange-200">
                  <h6 className="text-xl font-medium p-4 border border-b-orange-200 bg-orange-50">
                    Cart Totals
                  </h6>

                  <div className="px-5 py-8">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <p className=" text-gray-600"> Subtotal </p>
                        <p className=" text-gray-600">
                          {currency}
                          {cart.cartTotalAmount}
                        </p>
                      </div>
                      <hr />
                      <div className="flex justify-between">
                        <p className=" text-gray-600"> Total </p>
                        <p className=" text-gray-600">
                          {currency}
                          {cart.cartTotalAmount}
                        </p>
                      </div>
                      <hr />
                    </div>

                    <button
                      className="block px-4 py-4 text-lg mt-10 outline outline-1 outline-[#F7931E] text-[#F7931E] rounded hover:bg-[#F7931E] hover:text-white text-center w-full"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Cart;
