import React, { useEffect, useState } from "react";
import Layout from "../../app/Layout";
import axios from "axios";
import { API_URL } from "../../lib/constant";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getOrders = async () => {
    const response = await axios.get(`${API_URL}/orders`);
    setOrders(response.data.result);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl mt-3">My Orders</h2>
      <div className="mt-5 mb-8">
        {orders.map((item, index) => {
          return (
            <Card
              className="w-full h-auto flex flex-row mb-4 shadow-allSide transition-shadow duration-300 hover:shadow-onHover"
              shadow={false}
              key={index}
            >
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-2/12 shrink-0 rounded-r-none flex items-center"
              >
                <img
                  src={item.product_img}
                  className="h-32 w-full object-contain cursor-pointer"
                  onClick={() => navigate(`/product/${item.product_id}`)}
                />
              </CardHeader>
              <CardBody>
                <Typography
                  color="blue-gray"
                  className="mb-2 text-2xl font-medium"
                >
                  {item.product_name}
                </Typography>
                <Typography color="gray" className="mb-8 text-md font-normal">
                  {item.product_desc}
                </Typography>
                <Typography color="blue-gray" className="text-lg font-medium">
                  ₹{item.product_price}
                </Typography>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </Layout>
  );
};

export default Order;
