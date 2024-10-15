import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { API_URL } from "../../lib/constant";

const ViewCategory = () => {
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    const response = await axios.get(`${API_URL}/category`);
    setCategory(response.data.result);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const deleteCategory = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        const response = await axios.delete(`${API_URL}/category/${id}`);
        if (response.status === 200) {
          alert(response.data.message || "Record deleted successfully!");
          getCategory();
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
              Category Details
            </h3>
            <NavLink
              to="/admin/addcategory"
              className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <AddCircleOutlineRoundedIcon className="mr-1" /> Add Category
            </NavLink>
          </div>
          <div className="flex justify-center bg-white mx-3 py-4">
            <table className="w-[95%] text-left rounded-lg ">
              <thead className="border-b-[2px] ">
                <tr className="grid grid-cols-3">
                  <th className=" px-3 py-4">ID</th>
                  <th className=" px-3 py-4">Category</th>
                  <th className="px-3 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {category.map((curVal) => {
                  return (
                    <tr
                      key={curVal.category_id}
                      className="grid grid-cols-3 border-b-[1px] text-gray-500 items-center"
                    >
                      <td className="px-3 py-3">{curVal.category_id}</td>
                      <td className="px-3 py-3">{curVal.category}</td>
                      <td className="px-3 py-3 flex items-center">
                        <NavLink
                          to={`/admin/editcategory/${curVal.category_id}`}
                          className="px-4 py-2 mr-1 outline outline-1 outline-green-500 text-green-500 hover:bg-green-500 hover:text-white  rounded-md"
                        >
                          <EditRoundedIcon /> Edit
                        </NavLink>
                        <NavLink
                          to=""
                          className="px-4 py-2 bg-red-500 hover:bg-black text-white rounded-md"
                          onClick={() => deleteCategory(curVal.category_id)}
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

export default ViewCategory;
