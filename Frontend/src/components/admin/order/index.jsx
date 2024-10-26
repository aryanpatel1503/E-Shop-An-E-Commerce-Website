import axios from "axios";
import React, { useEffect, useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { NavLink } from "react-router-dom";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { API_URL } from "../../lib/constant";
import { toast } from "react-toastify";

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const response = await axios.get(`${API_URL}/orders`);
    setOrders(response.data.result);
  };
  useEffect(() => {
    getOrders();
  }, []);

  const handleDeleteOrder = async (id) => {
    try {
      if (window.confirm("Are you Sure you want to delete this record? ")) {
        const response = await axios.delete(`${API_URL}/orders/${id}`);

        if (response.status === 200) {
          toast.success(
            response.data.message || "Record deleted successfully!",
            {
              position: "top-center",
            }
          );
          getOrders();
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
      <div className="py-4 sm:ml-64">
        <div className="mt-10">
          <div className="h-20 flex justify-between items-center mb-2 px-4 bg-blue-100">
            <h3 className="text-2xl font-medium font-serif text-blue-500">
              Order Details
            </h3>
            <NavLink
              to="/admin/addorder"
              className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <AddCircleOutlineRoundedIcon className="mr-1" /> Add Order
            </NavLink>
          </div>
          <div className="flex justify-center bg-white mx-3 py-4">
            <table className="w-[95%] text-left rounded-lg ">
              <thead className="border-b-[2px] ">
                <tr className="">
                  <th className=" px-3 py-4">ID</th>
                  <th className=" px-3 py-4">Name</th>
                  <th className=" px-3 py-4">Address</th>
                  <th className=" px-3 py-4">City</th>
                  <th className=" px-3 py-4">State</th>
                  <th className="px-3 py-4">Mobile</th>
                  <th className="px-3 py-4">Email</th>
                  <th className="px-3 py-4">Pincode</th>
                  <th className="px-3 py-4">shipping_method</th>
                  <th className="px-3 py-4">Product</th>
                  <th className="px-3 py-4">User</th>
                  <th className="px-3 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders?.map((item) => {
                  return (
                    <tr
                      key={item.order_id}
                      className="border-b-[1px] text-gray-500"
                    >
                      <td className="px-3 py-3">{item.order_id}</td>
                      <td className="px-3 py-3">{item.order_name}</td>
                      <td className="px-3 py-3">{item.order_address}</td>
                      <td className="px-3 py-3">{item.order_city}</td>
                      <td className="px-3 py-3">{item.order_state}</td>
                      <td className="px-3 py-3">{item.order_mobile}</td>
                      <td className="px-3 py-3">{item.order_email}</td>
                      <td className="px-3 py-3">{item.order_pincode}</td>
                      <td className="px-3 py-3">{item.shipping_method}</td>
                      <td className="px-3 py-3">{item.product_name}</td>
                      <td className="px-3 py-3">{item.user_name}</td>
                      <td className="px-3 py-3 ">
                        <NavLink
                          to={`/admin/editorder/${item.order_id}`}
                          className="px-2 py-2 outline outline-1 outline-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-md flex mb-2 justify-center"
                        >
                          <EditRoundedIcon className="mr-2" /> Edit
                        </NavLink>
                        <NavLink
                          to=""
                          className="px-2 py-2 bg-red-500 hover:bg-black text-white rounded-md flex justify-center"
                          onClick={() => handleDeleteOrder(item.order_id)}
                        >
                          <DeleteRoundedIcon className="mr-2" />
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

export default ViewOrder;
