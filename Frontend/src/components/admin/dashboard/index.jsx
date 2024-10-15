import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../lib/constant";

const Dashboard = () => {
  const [userCount, setUserCount] = useState([]);
  const [productCount, setProductCount] = useState([]);
  const [categoryCount, setCategoryCount] = useState([]);
  const [orderCount, setOrderCount] = useState([]);

  useEffect(() => {
    const getUsersCount = async () => {
      const response = await axios.get(`${API_URL}/users/count`);
      setUserCount(response.data.result);
    };
    const getProductsCount = async () => {
      const response = await axios.get(`${API_URL}/products/count`);
      setProductCount(response.data.result);
    };
    const getCategoryCount = async () => {
      const response = await axios.get(`${API_URL}/category/count`);
      setCategoryCount(response.data.result);
    };
    const getOrdersCount = async () => {
      const response = await axios.get(`${API_URL}/orders/count`);
      setOrderCount(response.data.result);
    };

    getUsersCount();
    getProductsCount();
    getCategoryCount();
    getOrdersCount();
  }, []);
  return (
    <>
      {/* <div className="w-10/12 flex absolute top-0 right-0">

        <h2>Dashboard</h2>
        </div> */}

      <div className="py-4 sm:ml-64 mt-10">
        <div className="h-20 flex justify-between items-center mb-2 px-4 bg-blue-100">
          <h3 className="text-2xl font-medium font-serif text-blue-500">
            Dashboard
          </h3>
        </div>
        <div className="p-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center rounded bg-white h-28 dark:bg-gray-800 shadow-md">
            <h4 className="text-xl font-medium text-gray-400">Users</h4>
            {userCount.map((item, index) => {
              return (
                <p
                  key={index}
                  className="text-xl font-medium text-gray-500 dark:text-gray-500"
                >
                  {item.user_count}
                </p>
              );
            })}
          </div>
          <div className="flex flex-col items-center justify-center rounded bg-white h-28 dark:bg-gray-800 shadow-md">
            <h4 className="text-xl font-medium text-gray-400">Products</h4>
            {productCount.map((item, index) => {
              return (
                <p
                  key={index}
                  className="text-xl font-medium text-gray-500 dark:text-gray-500"
                >
                  {item.product_count}
                </p>
              );
            })}
          </div>
          <div className="flex flex-col items-center justify-center rounded bg-white h-28 dark:bg-gray-800 shadow-md">
            <h4 className="text-xl font-medium text-gray-400">Category</h4>
            {categoryCount.map((item, index) => {
              return (
                <p
                  key={index}
                  className="text-xl font-medium text-gray-500 dark:text-gray-500"
                >
                  {item.catcount}
                </p>
              );
            })}
          </div>
          <div className="flex flex-col items-center justify-center rounded bg-white h-28 dark:bg-gray-800 shadow-md">
            <h4 className="text-xl font-medium text-gray-400">Orders</h4>
            {orderCount.map((item, index) => {
              return (
                <p
                  key={index}
                  className="text-xl font-medium text-gray-500 dark:text-gray-500"
                >
                  {item.order_count}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
