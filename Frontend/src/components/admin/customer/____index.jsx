import axios from "axios";
import React, { useEffect, useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { NavLink } from "react-router-dom";
import { API_URL } from "../../lib/constant";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Sidebar from "../Sidebar";
import AdminNavbar from "../component/Navbar";

const ViewCustomer = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    setUsers(response.data.result);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      if (window.confirm("Are you Sure you want to delete this record? ")) {
        const response = await axios.delete(`${API_URL}/users/${id}`);

        if (response.status === 200) {
          alert(response.data.message || "Record deleted successfully!");
          getUsers();
        }
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <AdminNavbar />
          <div className="py-4 sm:ml-64 relative">
            <div className="mt-10">
              <div className="h-20 flex justify-between items-center mb-2 px-4 bg-blue-100">
                <h3 className="text-2xl font-medium font-serif text-blue-500">
                  Customer Details
                </h3>
                <NavLink
                  to="/admin/adduser"
                  className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <AddCircleOutlineRoundedIcon className="mr-1" /> Add Customer
                </NavLink>
              </div>
              <div className="absolute left-4 flex justify-start bg-white mx-3 py-4 w-full">
                <div className="overflow-y-auto max-h-96 w-[90%]">
                  <table className=" text-left rounded-lg ">
                    <thead className="border-b-[2px] ">
                      <tr className="">
                        <th className=" px-3 py-4">ID</th>
                        <th className=" px-3 py-4">Username</th>
                        <th className=" px-3 py-4">Fullname</th>
                        <th className=" px-3 py-4">Email</th>
                        <th className=" px-3 py-4">Mobile</th>
                        <th className="px-3 py-4">Password</th>
                        <th className="px-3 py-4">Gender</th>
                        <th className="px-3 py-4">Permanent Address</th>
                        <th className="px-3 py-4">Permanent City</th>
                        <th className="px-3 py-4">Permanent State</th>
                        <th className="px-3 py-4">Permanent Pincode</th>
                        <th className="px-3 py-4">Current Address</th>
                        <th className="px-3 py-4">Current City</th>
                        <th className="px-3 py-4">Current State</th>
                        <th className="px-3 py-4">Current Pincode</th>
                        <th className="px-3 py-4 w-[10%]">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {users?.map((item) => {
                        return (
                          <tr
                            key={item.user_id}
                            className="border-b-[1px] text-gray-500"
                          >
                            <td className="px-3 py-3">{item.user_id}</td>
                            <td className="px-3 py-3">{item.user_name}</td>
                            <td className="px-3 py-3">{item.user_fullname}</td>
                            <td className="px-3 py-3">{item.user_email}</td>
                            <td className="px-3 py-3">{item.user_mobile}</td>
                            <td className="px-3 py-3">{item.user_password}</td>
                            <td className="px-3 py-3">{item.user_gender}</td>
                            <td className="px-3 py-3">
                              {item.permanent_address}
                            </td>
                            <td className="px-3 py-3">{item.permanent_city}</td>
                            <td className="px-3 py-3">
                              {item.permanent_state}
                            </td>
                            <td className="px-3 py-3">
                              {item.permanent_pincode}
                            </td>
                            <td className="px-3 py-3">
                              {item.current_address}
                            </td>
                            <td className="px-3 py-3">{item.current_city}</td>
                            <td className="px-3 py-3">{item.current_state}</td>
                            <td className="px-3 py-3">
                              {item.current_pincode}
                            </td>
                            <td className="px-3 py-3 ">
                              <NavLink
                                to={`/admin/edituser/${item.user_id}`}
                                className="px-7 py-2 outline outline-1 outline-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-md flex mb-2"
                              >
                                <EditRoundedIcon className="mr-2" /> Edit
                              </NavLink>
                              <NavLink
                                to=""
                                className="px-4 py-2 bg-red-500 hover:bg-black text-white rounded-md flex"
                                onClick={() => handleDeleteUser(item.user_id)}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCustomer;
