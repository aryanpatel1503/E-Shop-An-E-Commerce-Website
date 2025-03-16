import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { API_URL } from "../../lib/constant";
import { toast } from "react-toastify";
import Pagination from "../../app/Pagination";
import AdminLayout from "../AdminLayout";

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
      <AdminLayout
        title="Product Details"
        actionName="Add Product"
        actionPath="/admin/addproduct"
      >
        <div className="bg-white py-4 flex flex-col items-center">
          <div className="overflow-x-auto h-[80%] w-[98%]">
            <table className="text-left rounded-lg">
              <thead className="border-b-[2px]">
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
                      <td className="px-3 py-3 min-w-[150px]">
                        {item.product_name}
                      </td>
                      <td className="px-3 py-3 min-w-[230px]">
                        {item.product_desc}
                      </td>
                      <td className="px-3 py-3 min-w-28">
                        <img
                          src={item.product_img}
                          alt="product image"
                          className="w-20"
                        />
                      </td>
                      <td className="px-3 py-3">{item.product_price}</td>
                      <td className="px-3 py-3">{item.product_color}</td>
                      <td className="px-3 py-3">{item.product_size}</td>
                      <td className="px-3 py-3">{item.product_storage}</td>
                      <td className="px-3 py-3">{item.product_brand}</td>
                      <td className="px-3 py-3 min-w-[200px]">
                        {item.product_special_features}
                      </td>
                      <td className="px-3 py-3">{item.product_weight}</td>
                      <td className="px-3 py-3">{item.product_height}</td>
                      <td className="px-3 py-3">{item.product_warranty}</td>
                      <td className="px-3 py-3">{item.product_guarantee}</td>
                      <td className="px-3 py-3 min-w-[200px]">
                        {item.product_info}
                      </td>
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
          <div className="mb-10 flex justify-end w-[98%]">
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
      </AdminLayout>
    </>
  );
};

export default ViewProduct;
