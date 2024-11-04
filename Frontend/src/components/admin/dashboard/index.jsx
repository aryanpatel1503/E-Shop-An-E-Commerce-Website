import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../lib/constant";
import AdminLayout from "../AdminLayout";

const Dashboard = () => {
  const [allCount, setAllCount] = useState({});

  const getAllCount = async () => {
    const response = await axios.get(`${API_URL}/counts`);
    setAllCount(response.data.result[0]);
  };

  useEffect(() => {
    getAllCount();
  }, []);

  return (
    <>
      <AdminLayout>
        <div className="">
          <div className="h-20 flex justify-between items-center px-4 bg-blue-100">
            <h3 className="text-2xl font-medium font-serif text-blue-500">
              Dashboard
            </h3>
          </div>
          <div className="bg-blue-gray-50 h-[80vh]">
            <div className="p-4 grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between px-16 rounded bg-white h-28 dark:bg-gray-800 shadow-md">
                <div>
                  <h4 className="text-xl font-medium text-gray-600">Users</h4>
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-500">
                    {allCount.total_users}
                  </p>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-8 h-8 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between px-16 rounded bg-white h-28 dark:bg-gray-800 shadow-md">
                <div>
                  <h4 className="text-xl font-medium text-gray-600">
                    Products
                  </h4>
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-500">
                    {allCount.total_products}
                  </p>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-8 h-8 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between px-16 rounded bg-white h-28 dark:bg-gray-800 shadow-md">
                <div>
                  <h4 className="text-xl font-medium text-gray-600">
                    Category
                  </h4>
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-500">
                    {allCount.total_categories}
                  </p>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-8 h-8 transition duration-75 dark:text-gray-400 group-hover:text-blue-100 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between px-16 rounded bg-white h-28 dark:bg-gray-800 shadow-md">
                <div>
                  <h4 className="text-xl font-medium text-gray-600">Orders</h4>
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-500">
                    {allCount.total_orders}
                  </p>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-8 h-8 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Dashboard;
