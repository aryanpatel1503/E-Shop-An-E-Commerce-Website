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

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

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

  const navigate = useNavigate();
  console.log(cart.cartItems);
  return (
    <>
      <Layout>
        <div className="md:mx-container my-16 bg-white">
          <section className="">
            <h3 className="text-3xl mb-7 text-center">Cart</h3>

            <div className="mb-7">
              <table className=" w-full border-collapse border border-orange-200 ">
                <thead className="bg-orange-50 text-gray-600">
                  <tr className="grid grid-cols-5 ">
                    <th className="py-3"></th>
                    <th className="py-3">Product</th>
                    <th className="py-3">Price</th>
                    <th className="py-3">Quantity</th>
                    <th className="py-3">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="border border-orange-200 text-gray-600 max-h-96">
                  {/* <Scrollbars> */}
                  {cart.cartItems.length === 0 ? (
                    <div className="cart_empty flex flex-col justify-center items-center h-48">
                      <h4 className="text-center mb-3">
                        Your cart is currently empty.
                      </h4>
                      <NavLink
                        to="/product"
                        className="outline outline-1 outline-[#F7931E] text-[#F7931E] hover:bg-[#F7931E] hover:text-white px-5 py-3 bg-violet-600  rounded hover:bg-violet-700 "
                      >
                        {/* <i className="bi bi-arrow-left"></i> */}
                        <span className="ms-2">Start Shopping</span>
                      </NavLink>
                    </div>
                  ) : (
                    cart.cartItems?.map((cartItem, index) => {
                      return (
                        <tr
                          key={index}
                          className="grid grid-cols-5 justify-center items-center text-center border-b-[1px] "
                        >
                          <td className="py-3 flex items-center justify-evenly">
                            <HighlightOffIcon
                              className="text-gray-400 hover:text-red-500 "
                              onClick={() => handleRemoveFromCart(cartItem)}
                            />
                            <img src={cartItem.product_img} alt="" width={70} />
                          </td>
                          <td className="py-3 flex justify-around">
                            <p>{cartItem.product_title}</p>
                          </td>
                          <td className=" py-3">${cartItem.product_price}</td>
                          <td className="text-center py-3 flex justify-center items-center">
                            {/* <input
                        type="number"
                        name=""
                        className="px-2 py-3 w-3/12 border"
                        defaultValue={1}
                      /> */}
                            <span className="flex items-center">
                              <button
                                className="w-14 py-2 bg-[#F7931E] text-white rounded hover:bg-[#ea942f]"
                                onClick={() => handleDecreaseCart(cartItem)}
                              >
                                -
                              </button>
                              <p className="quantity_count px-4">
                                {cartItem.cartQuantity}
                              </p>
                              <button
                                className="w-14 py-2 bg-[#F7931E] text-white rounded hover:bg-[#ea942f]"
                                onClick={() => handleIncreaseCart(cartItem)}
                              >
                                +
                              </button>
                            </span>
                          </td>
                          <td className=" py-3">
                            ${cartItem.product_price * cartItem.cartQuantity}
                          </td>
                        </tr>
                      );
                    })
                  )}

                  <tr className="border border-orange-200">
                    <td className="p-3 flex justify-between">
                      <React.Fragment className="flex items-center justify-end">
                        <button
                          className="px-5 py-3 bg-red-500 hover:bg-red-600 rounded text-white"
                          onClick={handleClearCart}
                        >
                          <DeleteIcon className="mr-2" />
                          Clear Cart
                        </button>
                      </React.Fragment>
                    </td>
                  </tr>
                </tbody>

                {/* </Scrollbars> */}
              </table>
            </div>

            <div className="flex justify-end">
              <div className="w-4/12">
                <div className="border border-orange-200 ">
                  <h6 className="text-xl font-medium p-4 border-b bg-orange-50">
                    Cart totals
                  </h6>

                  <div className="px-5 py-8">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <p className=" text-gray-600"> Subtotal </p>
                        <p className=" text-gray-600">
                          ${cart.cartTotalAmount}
                        </p>
                      </div>
                      <hr />
                      <div className="flex justify-between">
                        <p className=" text-gray-600"> Total </p>
                        <p className=" text-gray-600">
                          ${cart.cartTotalAmount}
                        </p>
                      </div>
                      <hr />
                    </div>
                    {/* <button onClick={() => navigate("/checkout")} className="w-full py-4 text-lg mt-5 outline outline-1 text-violet-600 rounded hover:bg-violet-600 hover:text-white">
                Proceed to checkout
              </button> */}
                    <NavLink
                      to={`/checkout`}
                      className="block px-4 py-4 text-lg mt-10 outline outline-1 outline-[#F7931E] text-[#F7931E] rounded hover:bg-[#F7931E] hover:text-white text-center"
                    >
                      Checkout
                    </NavLink>
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
