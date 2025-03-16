import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../lib/constant";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Pagination from "../../app/Pagination";
import AdminLayout from "../AdminLayout";
import { isblank, showLocalString } from "../../lib/commonFunctions";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const Report = () => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(0);
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const [productCurrentPage, setProductCurrentPage] = useState(1);
  const [orderCurrentPage, setOrderCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const userData = data?.users?.slice(
    (userCurrentPage - 1) * itemsPerPage,
    userCurrentPage * itemsPerPage
  );
  const productData = data?.products?.slice(
    (productCurrentPage - 1) * itemsPerPage,
    productCurrentPage * itemsPerPage
  );
  const orderData = data?.orders?.slice(
    (orderCurrentPage - 1) * itemsPerPage,
    orderCurrentPage * itemsPerPage
  );

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    setData((prev) => ({
      ...prev,
      users: response.data.result,
    }));
  };

  const getAllProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    setData((prev) => ({
      ...prev,
      products: response.data.result,
    }));
  };

  const getAllOrders = async () => {
    const response = await axios.get(`${API_URL}/ordersNew`);
    response.data.result = response.data.result.map((item) => {
      const order_items =
        !isblank(item.order_items) && typeof item.order_items === "string"
          ? JSON.parse(item.order_items)
          : [];
      return {
        ...item,
        product_name: order_items?.map((i) => i.product_name)?.toString() || "",
        order_items,
      };
    });
    setData((prev) => ({
      ...prev,
      orders: response.data.result,
    }));
  };

  useEffect(() => {
    getAllUsers();
    getAllProducts();
    getAllOrders();
  }, []);

  return (
    <AdminLayout title="Report">
      <div className="bg-white mx-3 py-4">
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            Customer Report
          </AccordionHeader>
          <AccordionBody>
            <div className="overflow-auto">
              <table className="text-left rounded-lg ">
                <thead className="border-b-[2px] overflow-auto">
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
                  </tr>
                </thead>

                <tbody className="overflow-auto">
                  {userData?.map((item) => {
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
                        <td className="px-3 py-3">{item.permanent_address}</td>
                        <td className="px-3 py-3">{item.permanent_city}</td>
                        <td className="px-3 py-3">{item.permanent_state}</td>
                        <td className="px-3 py-3">{item.permanent_pincode}</td>
                        <td className="px-3 py-3">{item.current_address}</td>
                        <td className="px-3 py-3">{item.current_city}</td>
                        <td className="px-3 py-3">{item.current_state}</td>
                        <td className="px-3 py-3">{item.current_pincode}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot></tfoot>
              </table>
            </div>
            <Pagination
              data={data?.users}
              itemsPerPage={itemsPerPage}
              currentPage={userCurrentPage}
              setCurrentPage={setUserCurrentPage}
              alignRight={true}
              buttonName={false}
            />
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            Product Report
          </AccordionHeader>
          <AccordionBody className="">
            <div className="overflow-auto">
              <table className="text-left rounded-lg ">
                <thead className="border-b-[2px] ">
                  <tr className="">
                    <th className=" px-3 py-4 text-center">ID</th>
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination
              data={data?.products}
              itemsPerPage={itemsPerPage}
              currentPage={productCurrentPage}
              setCurrentPage={setProductCurrentPage}
              alignRight={true}
              buttonName={false}
            />
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(3)}>
            Order Report
          </AccordionHeader>
          <AccordionBody className="overflow-auto">
            <div className="overflow-auto">
              <table className="w-full text-left rounded-lg ">
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
                    <th className="px-3 py-4">Date</th>
                    <th className="px-3 py-4">Status</th>
                    <th className="px-3 py-4">Shipping Method</th>
                    <th className="px-3 py-4">Product</th>
                  </tr>
                </thead>

                <tbody>
                  {orderData?.map((item) => {
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
                        <td className="px-3 py-3">
                          {showLocalString(item.order_date)}
                        </td>
                        <td className="px-3 py-3">{item.order_status}</td>
                        <td className="px-3 py-3">{item.shipping_method}</td>
                        <td className="px-3 py-3">{item.product_name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination
              data={data?.orders}
              itemsPerPage={itemsPerPage}
              currentPage={orderCurrentPage}
              setCurrentPage={setOrderCurrentPage}
              alignRight={true}
              buttonName={false}
            />
          </AccordionBody>
        </Accordion>
      </div>
    </AdminLayout>
  );
};

export default Report;
