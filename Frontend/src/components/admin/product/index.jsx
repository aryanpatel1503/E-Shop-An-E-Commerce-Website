import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { API_URL } from "../../lib/constant";
import { toast } from "react-toastify";
import Pagination from "../../app/Pagination";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const productData = products?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    setProducts(response.data.result);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      if (window.confirm("Are you Sure you want to delete this record? ")) {
        const response = await axios.delete(`${API_URL}/products/${id}`);

        if (response.status === 200) {
          toast.success(
            response.data.message || "Record deleted successfully!",
            {
              position: "top-center",
            }
          );
          getProducts();
        }
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className="py-4 sm:ml-64 relative w-[82.1%]">
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
          <div className="absolute left-4 flex flex-col justify-start bg-white mx-3 py-4 w-[98%]">
            <div className="overflow-x-auto overflow-y-auto w-[99%] h-[80%]">
              <table className="text-left rounded-lg ">
                <thead className="border-b-[2px] ">
                  <tr className="text-center">
                    <th className=" px-3 py-4">ID</th>
                    <th className=" px-3 py-4">Product Name</th>
                    <th className=" px-3 py-4">Description</th>
                    <th className=" px-3 py-4">Image</th>
                    <th className=" px-3 py-4">Price</th>
                    <th className=" px-3 py-4">Color</th>
                    <th className=" px-3 py-4">Size</th>
                    <th className=" px-3 py-4">Storage</th>
                    <th className=" px-3 py-4">Brand</th>
                    <th className=" px-3 py-4">Special Features</th>
                    <th className=" px-3 py-4">Weight</th>
                    <th className=" px-3 py-4">Height</th>
                    <th className=" px-3 py-4">Warranty</th>
                    <th className=" px-3 py-4">Guarantee</th>
                    <th className=" px-3 py-4">Info</th>
                    <th className="px-3 py-4">Category</th>
                    <th className="px-3 py-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {productData?.map((item) => {
                    return (
                      <tr
                        key={item.product_id}
                        className="border-b-[1px] text-gray-500"
                      >
                        <td className="px-3 py-3">{item.product_id}</td>
                        <td className="px-3 py-3">{item.product_name}</td>
                        <td className="px-3 py-3">{item.product_desc}</td>
                        <td className="px-3 py-3">
                          <img src={item.product_img} alt="" width={100} />
                        </td>
                        <td className="px-3 py-3">{item.product_price}</td>
                        <td className="px-3 py-3">{item.product_color}</td>
                        <td className="px-3 py-3">{item.product_size}</td>
                        <td className="px-3 py-3">{item.product_storage}</td>
                        <td className="px-3 py-3">{item.product_brand}</td>
                        <td className="px-3 py-3">
                          {item.product_special_features}
                        </td>
                        <td className="px-3 py-3">{item.product_weight}</td>
                        <td className="px-3 py-3">{item.product_height}</td>
                        <td className="px-3 py-3">{item.product_warranty}</td>
                        <td className="px-3 py-3">{item.product_guarantee}</td>
                        <td className="px-3 py-3">{item.product_info}</td>
                        <td className="px-3 py-3">{item.category}</td>
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
            <Pagination
              data={products}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              alignRight={true}
              buttonName={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
