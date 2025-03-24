import React, { useEffect, useState } from "react";
import Layout from "../../app/Layout";
import axios from "axios";
import { API_URL } from "../../lib/constant";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Invoice from "./InvoiceDocument";
import { isblank } from "../../lib/commonFunctions";
import { toast } from "react-toastify";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [ordersRawData, setOrdersRawData] = useState([]);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const getStatusColor = (status) => {
    if (status === "delivered") {
      return "green";
    } else if (status === "shipped") {
      return "cyan";
    } else if (status === "cancelled") {
      return "red";
    }
    return "yellow";
  };

  const handleCancelOrder = async (id) => {
    try {
      if (window.confirm("Are you sure you want to cancel this order?")) {
        const response = await axios.put(`${API_URL}/orders/cancel/${id}`);
        if (response.status === 200) {
          toast.success(
            response.data.message || "Order cancelled successfully!",
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

  const getOrders = async () => {
    const response = await axios.get(`${API_URL}/getOrdersNew/${user_id}`);
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
    setOrdersRawData(response.data.result);

    const newOrderArray = response.data.result.flatMap((order) =>
      order.order_items.map((item) => ({
        ...order,
        order_items: item,
      }))
    );
    setOrders(newOrderArray);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout>
      <div className="px-4 md:px-0 my-10">
        <h2 className="text-2xl mt-3">My Orders</h2>
        <div className="mt-5 mb-8">
          {orders.map((item, index) => {
            return (
              <Card
                className="w-full h-auto flex flex-col md:flex-row mb-4 shadow-allSide transition-shadow duration-300 hover:shadow-onHover"
                shadow={false}
                key={index}
              >
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="m-0 w-full md:w-2/12 p-5 md:p-0 shrink-0 flex items-center"
                >
                  <img
                    src={item.order_items?.product_img}
                    className="h-32 w-full object-contain cursor-pointer"
                    onClick={() =>
                      navigate(`/product/${item.order_items?.product_id}`)
                    }
                  />
                </CardHeader>
                <CardBody className="flex flex-col w-full p-4 md:p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <Typography
                      color="blue-gray"
                      className="mb-2 text-xl md:text-2xl font-medium"
                    >
                      {item.order_items?.product_name}
                    </Typography>
                    {/* <Typography color="gray" className="text-base font-normal">
                      {item.order_id}
                    </Typography> */}
                  </div>
                  <Typography color="gray" className="text-base font-normal">
                    {item.order_items?.product_desc}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="my-4 text-lg md:text-xl font-medium"
                  >
                    ₹{item.order_items?.price}
                  </Typography>
                  <Chip
                    variant="ghost"
                    color={getStatusColor(item.order_status)}
                    size="sm"
                    value={item.order_status}
                    className="self-start"
                  />
                  {item.order_status === "pending" && (
                    <div className="mt-4">
                      <Button
                        variant="outlined"
                        size="sm"
                        color="red"
                        onClick={() => handleCancelOrder(item.order_id)}
                      >
                        Cancel Order
                      </Button>
                    </div>
                  )}
                  {item.order_status === "delivered" && (
                    <div className="mt-4">
                      <Invoice item={item} ordersRawData={ordersRawData} />
                    </div>
                  )}
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Order;
