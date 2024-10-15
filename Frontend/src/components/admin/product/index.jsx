import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:3001/products");
    setProducts(response.data.result);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      if (window.confirm("Are you Sure you want to delete this record? ")) {
        const response = await axios.delete(
          `http://localhost:3001/products/${id}`
        );

        if (response.status === 200) {
          alert(response.data.message || "Record deleted successfully!");
          getProducts();
        }
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="py-4 sm:ml-64">
        <div className="mt-10">
          <div className="h-20 flex justify-between items-center mb-2 px-4 bg-blue-100">
            <h3 className="text-2xl font-medium font-serif text-blue-500">
              Product Details
            </h3>
            <NavLink
              to="/admin/addproduct"
              className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <AddCircleOutlineRoundedIcon className="mr-1" /> Add Product
            </NavLink>
          </div>
          <div className="flex justify-center bg-white mx-3 py-4">
            <table className="w-[95%] text-left rounded-lg ">
              <thead className="border-b-[2px] ">
                <tr className="text-center">
                  <th className=" px-3 py-4">ID</th>
                  <th className=" px-3 py-4">Product Title</th>
                  <th className=" px-3 py-4">Description</th>
                  <th className=" px-3 py-4">Image</th>
                  <th className=" px-3 py-4">Price</th>
                  <th className="px-3 py-4">Category ID</th>
                  <th className="px-3 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item) => {
                  const name = item.product_title?.replaceAll(" ", "_");
                  return (
                    <tr
                      key={item.product_id}
                      className="border-b-[1px] text-gray-500"
                    >
                      <td className="px-3 py-3">{item.product_id}</td>
                      <td className="px-3 py-3">{item.product_title}</td>
                      <td className="px-3 py-3">{item.product_desc}</td>
                      <td className="px-3 py-3">
                        <img src={item.product_img} alt="" width={100} />
                      </td>
                      <td className="px-3 py-3">{item.product_price}</td>
                      <td className="px-3 py-3">{item.category_id}</td>
                      <td className="px-3 py-3 ">
                        <NavLink
                          to={`/admin/editproduct/${item.product_id}`}
                          className="px-7 py-2 outline outline-1 outline-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-md flex mb-2"
                        >
                          <EditRoundedIcon /> Edit
                        </NavLink>
                        <NavLink
                          to=""
                          className="px-4 py-2 bg-red-500 hover:bg-black text-white rounded-md flex"
                          onClick={() => deleteProduct(item.product_id)}
                        >
                          <DeleteRoundedIcon />
                          Delete
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
