import { Add, Delete, HighlightOff, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const ProductListComponent = ({
  data,
  handleIncreaseItem,
  handleDecreaseItem,
  handleRemoveItem,
  handleClearItems,
  from = "cart",
}) => {
  const currency = "₹";
  const borderBottom = from === "cart" ? "border-b-orange-200" : "border-b";

  return (
    <div
      className={`mb-7 w-full overflow-auto border ${
        from === "cart" ? "border-orange-200" : ""
      }`}
    >
      <table className="table-auto w-full">
        <thead
          className={`${
            from === "cart" ? "bg-orange-50" : "bg-gray-100"
          } text-gray-600`}
        >
          <tr className={`border ${borderBottom}`}>
            <th scope="col" className="py-3"></th>
            <th scope="col" className="py-3">
              Product
            </th>
            <th scope="col" className="py-3">
              Price
            </th>
            <th scope="col" className="py-3">
              Quantity
            </th>
            <th scope="col" className="py-3 pr-3">
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 max-h-96 overflow-auto">
          {/* <Scrollbars> */}
          {data.length === 0 ? (
            <tr className={`border ${borderBottom}`}>
              <td colSpan={5}>
                <div className="flex flex-col justify-center items-center h-48">
                  <h4 className="text-center mb-3">
                    {from === "cart"
                      ? "Your cart is currently empty."
                      : "No items found."}
                  </h4>
                  <NavLink
                    to="/products/laptop"
                    className="outline outline-1 outline-[#F7931E] text-[#F7931E] hover:bg-[#F7931E] hover:text-white px-5 py-3 bg-violet-600 rounded hover:bg-violet-700"
                  >
                    <span className="ms-2">Start Shopping</span>
                  </NavLink>
                </div>
              </td>
            </tr>
          ) : (
            data?.map((cartItem, index) => {
              return (
                <tr
                  key={index}
                  className={`text-center border ${borderBottom}`}
                >
                  <td className="min-w-[120px] py-3">
                    <span className="flex items-center justify-evenly">
                      <IconButton
                        onClick={() => handleRemoveItem(cartItem)}
                        className="group"
                      >
                        <HighlightOff className="text-gray-400 group-hover:text-red-500" />
                      </IconButton>
                      <NavLink to={`/product/${cartItem.product_id}`}>
                        <img
                          src={cartItem.product_img}
                          alt="Product image"
                          width={90}
                        />
                      </NavLink>
                    </span>
                  </td>
                  <td className="min-w-[200px] py-3">
                    <NavLink to={`/product/${cartItem.product_id}`}>
                      {cartItem.product_name}
                    </NavLink>
                  </td>
                  <td className="min-w-[100px] py-3">
                    {currency}
                    {cartItem.product_price}
                  </td>
                  <td className="py-3">
                    <span className="flex items-center justify-center">
                      <IconButton
                        sx={from === "cart" && { color: "#F7931E" }}
                        onClick={() => handleDecreaseItem(cartItem)}
                      >
                        <Remove />
                      </IconButton>
                      <input
                        value={cartItem.cartQuantity}
                        className="text-center w-10 bg-inherit"
                        disabled
                      />
                      <IconButton
                        sx={from === "cart" && { color: "#F7931E" }}
                        onClick={() => handleIncreaseItem(cartItem)}
                      >
                        <Add />
                      </IconButton>
                    </span>
                  </td>
                  <td className="py-3 min-w-[100px]">
                    {currency}
                    {cartItem.product_price * cartItem.cartQuantity}
                  </td>
                </tr>
              );
            })
          )}

          {handleClearItems && (
            <tr className="border !border-t-orange-200">
              <td className="p-3" colSpan={2}>
                <React.Fragment>
                  <button
                    className="px-5 py-3 bg-red-500 hover:bg-red-600 rounded text-white flex self-end"
                    onClick={handleClearItems}
                  >
                    <Delete className="mr-2" />
                    Clear Cart
                  </button>
                </React.Fragment>
              </td>
            </tr>
          )}
        </tbody>

        {/* </Scrollbars> */}
      </table>
    </div>
  );
};

export default ProductListComponent;
