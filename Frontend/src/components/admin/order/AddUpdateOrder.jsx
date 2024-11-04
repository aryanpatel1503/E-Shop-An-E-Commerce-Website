import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import {
  Button,
  Input,
  Option,
  Radio,
  // Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { borderForField } from "../../lib/commonFunctions";
import { API_URL } from "../../lib/constant";
import { FormControl, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import AdminLayout from "../AdminLayout";

const AddUpdateOrder = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const defaultValues = {
    order_name: "",
    order_address: "",
    order_city: "",
    order_state: "",
    order_mobile: "",
    order_email: "",
    order_pincode: "",
    order_status: "pending",
    shipping_method: "cash on delivery",
    product_id: "",
    user_id: "",
  };
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  const navigate = useNavigate();
  const { name } = useParams();
  const val = name?.replaceAll("_", " ");

  const formValues = watch();

  const onSubmitError = (values) => {
    console.log(values);
  };

  const onSubmitData = (values) => {
    if (name) {
      axios
        .put(`${API_URL}/orders/${val}`, {
          ...values,
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Order Updated Successfully", {
              position: "top-center",
            });
            navigate("/admin/vieworder");
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-center",
          });
        });
    } else {
      axios
        .post(`${API_URL}/orders/add`, {
          ...values,
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success(response.data.message || "Order added Successfully", {
              position: "top-center",
            });
            navigate("/admin/vieworder");
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-center",
          });
        });
    }
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    handleSubmit(onSubmitData, onSubmitError)();
  };

  useEffect(() => {
    if (name) {
      axios
        .get(`${API_URL}/orders/${val}`)
        .then((response) => {
          reset((formValues) => ({
            ...formValues,
            ...response.data.result[0],
          }));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [name]);

  const getProduct = async () => {
    const response = await axios.get(`${API_URL}/products`);
    setAllProducts(response.data.result);
  };
  const getUser = async () => {
    const response = await axios.get(`${API_URL}/users`);
    setAllUsers(response.data.result);
  };
  useEffect(() => {
    getProduct();
    getUser();
  }, []);

  return (
    <AdminLayout>
      <div className="">
        <div className="h-20 flex justify-between items-center mb-2 px-4 bg-blue-100">
          <h3 className="text-2xl font-medium font-serif text-blue-500">
            {name ? "Edit Order" : "Add Order"}
          </h3>
          <NavLink
            to="/admin/vieworder"
            className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <ArrowBackRoundedIcon className="mr-1" />
            Back
          </NavLink>
        </div>
        <div className="flex justify-center">
          <div className="w-8/12 bg-white rounded-md flex flex-col items-center">
            <form className="w-11/12 flex flex-col items-center justify-center my-10">
              <div className="mb-1 flex flex-col gap-4 w-full">
                <div className="w-full">
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Name
                  </Typography>
                  <Controller
                    name="order_name"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        size="lg"
                        placeholder="name"
                        onChange={onChange}
                        value={value}
                        className={borderForField(errors.order_name)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.order_name}
                      />
                    )}
                  />
                  {errors.order_name && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.order_name.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Address
                  </Typography>
                  <Controller
                    name="order_address"
                    control={control}
                    rules={{ required: "Address is required" }}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        size="lg"
                        className={`${borderForField(errors.order_address)}`}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.order_address}
                      />
                    )}
                  />
                  {errors.order_address && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.order_address.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    City
                  </Typography>
                  <Controller
                    name="order_city"
                    control={control}
                    rules={{ required: "City is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="lg"
                        placeholder="City"
                        className={borderForField(errors.order_city)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.order_city}
                      />
                    )}
                  />
                  {errors.order_city && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.order_city.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    State
                  </Typography>
                  <Controller
                    name="order_state"
                    control={control}
                    rules={{ required: "State is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="lg"
                        placeholder="State"
                        className={borderForField(errors.order_state)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.order_state}
                      />
                    )}
                  />
                  {errors.order_state && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.order_state.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Mobile
                  </Typography>
                  <Controller
                    name="order_mobile"
                    control={control}
                    rules={{ required: "Mobile is required" }}
                    render={({ field }) => (
                      <Input
                        size="lg"
                        {...field}
                        placeholder="Mobile"
                        className={borderForField(errors.order_mobile)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.order_mobile}
                      />
                    )}
                  />
                  {errors.order_mobile && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.order_mobile.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Email
                  </Typography>
                  <Controller
                    name="order_email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Enter a valid email address",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="lg"
                        placeholder="name@mail.com"
                        className={borderForField(errors.order_email)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.order_email}
                      />
                    )}
                  />
                  {errors.order_email && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.order_email.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Pincode
                  </Typography>
                  <Controller
                    name="order_pincode"
                    control={control}
                    rules={{ required: "Pincode is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="lg"
                        placeholder="Pincode"
                        className={borderForField(errors.order_pincode)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.order_pincode}
                      />
                    )}
                  />
                  {errors.order_pincode && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.order_pincode.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Order Status
                  </Typography>
                  <Controller
                    name="order_status"
                    control={control}
                    rules={{ required: "Order status is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select order status"
                        className={borderForField(errors.order_status)}
                        inputProps={{ "aria-label": "Without label" }}
                        fullWidth={true}
                        sx={{ height: 45 }}
                        error={errors.order_status}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="shipped">Shipped</MenuItem>
                        <MenuItem value="out for delivery">
                          Out For Delivery
                        </MenuItem>
                        <MenuItem value="delivered">Delivered</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.order_status && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.order_status.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Shipping Method
                  </Typography>
                  <Controller
                    name="shipping_method"
                    control={control}
                    rules={{ required: "Shipping method is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select shipping method"
                        className={borderForField(errors.shipping_method)}
                        inputProps={{ "aria-label": "Without label" }}
                        fullWidth={true}
                        sx={{ height: 45 }}
                        error={errors.shipping_method}
                      >
                        <MenuItem value="cash on delivery">
                          Cash on Delivery
                        </MenuItem>
                      </Select>
                    )}
                  />
                  {errors.shipping_method && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.shipping_method.message}
                    </Typography>
                  )}
                </div>

                <div className="w-full mt-2">
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Product
                  </Typography>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <Controller
                      name="product_id"
                      control={control}
                      rules={{ required: "Product is required" }}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          value={value}
                          onChange={onChange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          fullWidth={true}
                          sx={{ height: 45 }}
                        >
                          {allProducts.map((item, index) => {
                            return (
                              <MenuItem
                                key={item.product_id}
                                value={item.product_id}
                              >
                                {item.product_name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      )}
                    />
                  </FormControl>
                  {errors.product_id && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.product_id.message}
                    </Typography>
                  )}
                </div>

                <div className="w-full mt-2">
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Customer
                  </Typography>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <Controller
                      name="user_id"
                      control={control}
                      rules={{ required: "Customer is required" }}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          value={value}
                          onChange={onChange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          fullWidth={true}
                          sx={{ height: 45 }}
                        >
                          {allUsers.map((item, index) => {
                            return (
                              <MenuItem key={item.user_id} value={item.user_id}>
                                {item.user_name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      )}
                    />
                  </FormControl>
                  {errors.user_id && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.user_id.message}
                    </Typography>
                  )}
                </div>
              </div>

              <Button
                variant="filled"
                className="mt-6 bg-green-500 text-white 
               text-md font-medium rounded-md hover:bg-green-600 capitalize"
                fullWidth
                type="submit"
                onClick={handleAddOrder}
              >
                {name ? "Update Order" : "Add Order"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddUpdateOrder;
