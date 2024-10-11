import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../app/Layout";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Select, Option } from "@material-tailwind/react";

const Checkout = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const params = useParams();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="my-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-4xl mx-auto my-8"
        >
          <h2 className="text-3xl font-medium text-center">Checkout</h2>
          <hr className="my-8 border-[1.3px] border-gray-300" />
          <h2 className="text-2xl font-bold mb-4">Order Details</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Iphone XR"
                className="mr-4"
              />
            </div>
            <div className="flex items-center">
              <h3 className="text-xl font-semibold">Iphone XR</h3>
            </div>
            <div className="flex items-center justify-end">
              <p className="text-xl">₹35000</p>
            </div>
          </div>

          <hr className="my-8 border-[1.3px] border-gray-300" />
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="Ship to name"
                  error={errors.name && errors.name.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="Address"
                  error={errors.address && errors.address.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="state"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="State"
                  error={errors.state && errors.state.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="City"
                  error={errors.city && errors.city.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="mobile"
              control={control}
              rules={{
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid mobile number",
                },
              }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="Mobile No."
                  error={errors.mobile && errors.mobile.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email",
                },
              }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="Email"
                  error={errors.email && errors.email.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="pincode"
              control={control}
              rules={{ required: "Pincode is required" }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="Pincode"
                  error={errors.pincode && errors.pincode.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="paymentMethod"
              control={control}
              rules={{ required: "Payment method is required" }}
              render={({ field }) => (
                <Select
                  label="Payment method"
                  error={errors.paymentMethod && errors.paymentMethod.message}
                  {...field}
                >
                  <Option value="Cash on delivery">Cash on delivery</Option>
                </Select>
              )}
            />
          </div>

          <hr className="my-8 border-[1.3px] border-gray-300" />
          <h2 className="text-2xl font-bold mb-4">Payment Info</h2>
          <p className="text-green-600 font-semibold mb-6">Cash On Delivery</p>

          <hr className="my-8 border-[1.3px] border-gray-300" />
          <h2 className="text-2xl font-bold mb-4">Billing Info</h2>
          <p className="text-green-600 font-semibold mb-6">Total: ₹35000</p>

          <div className="flex justify-between">
            <Button
              variant="outlined"
              size="md"
              className="text-red-600 border-red-600"
            >
              Cancel Order
            </Button>
            <Button type="submit" size="md" className="bg-teal-500">
              Confirm Order
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
