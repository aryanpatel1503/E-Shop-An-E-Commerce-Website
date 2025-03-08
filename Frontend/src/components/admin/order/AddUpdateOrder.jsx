import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import {
  Button,
  Card,
  CardFooter,
  IconButton,
  Input,
  Option,
  Radio,
  // Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  borderForField,
  generateOrderId,
  isblank,
} from "../../lib/commonFunctions";
import { API_URL } from "../../lib/constant";
import { FormControl, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import AdminLayout from "../AdminLayout";
import DeleteIcon from "@mui/icons-material/Delete";

const AddUpdateOrder = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const TABLE_HEAD = [
    {
      name: "Product",
      width: "",
    },
    {
      name: "Quantity",
      width: 50,
    },
    {
      name: "",
      width: 30,
    },
  ];

  const TABLE_ROWS = [
    {
      name: "John Michael",
      job: "Manager",
      date: "23/04/18",
    },
  ];

  const defaultValues = {
    // order_id: generateOrderId(),
    order_name: "",
    order_address: "",
    order_city: "",
    order_state: "",
    order_mobile: "",
    order_email: "",
    order_pincode: "",
    order_status: "pending",
    shipping_method: "cash on delivery",
    total_amount: 0,
    // product_id: "",
    user_id: "",
    order_items: [{ product_id: "", quantity: "" }],
  };
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "order_items",
    rules: {
      minLength: 1,
    },
  });
  const watchFieldArray = watch("order_items");
  const controlledFields = fields.map((item, index) => ({
    ...item,
    ...watchFieldArray[index],
  }));

  const navigate = useNavigate();
  const { name } = useParams();
  const val = name?.replaceAll("_", " ");

  const formValues = watch();

  const handleAddRow = () => {
    append({
      product_id: "",
      quantity: "",
    });
  };

  const onSubmitError = (values) => {
    console.log(values);
  };

  const onSubmitData = (values) => {
    const productIdArr = values.order_items.map((i) => i.product_id);
    let product = allProducts.filter((item) =>
      productIdArr.includes(item.product_id)
    );
    product = product.map((item) => {
      const updated = item;
      const orderItem = values.order_items.find(
        (i) => i.product_id === item.product_id
      );
      if (orderItem.product_id === item.product_id) {
        updated.quantity = orderItem.quantity;
      }
      return updated;
    });
    const totalAmount = parseFloat(
      product?.reduce(
        (acc, item) => acc + item.product_price * parseFloat(item.quantity),
        0
      )
    ).toFixed(2);

    if (name) {
      axios
        .put(`${API_URL}/orders/update/${val}`, {
          ...values,
          total_amount: totalAmount,
          order_items: JSON.stringify(values.order_items),
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
        .post(`${API_URL}/orders/addNew`, {
          ...values,
          total_amount: totalAmount,
          order_items: JSON.stringify(values.order_items),
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
        .get(`${API_URL}/ordersNew/${val}`)
        .then((response) => {
          const orderItems = response.data.result[0].order_items;
          response.data.result[0].order_items =
            !isblank(orderItems) && typeof orderItems === "string"
              ? JSON.parse(orderItems)
              : [];
          response.data.result[0].order_items =
            response.data.result[0].order_items?.map((item) => ({
              product_id: item.product_id,
              quantity: item.quantity,
            }));
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
                    className="text-base font-semibold"
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
                    <Typography color="red" className="text-sm font-medium">
                      {errors.order_name.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-base font-semibold"
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
                    <Typography color="red" className="text-sm font-medium">
                      {errors.order_address.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-base font-semibold"
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
                    <Typography color="red" className="text-sm font-medium">
                      {errors.order_city.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-base font-semibold"
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
                    <Typography color="red" className="text-sm font-medium">
                      {errors.order_state.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-base font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Mobile
                  </Typography>
                  <Controller
                    name="order_mobile"
                    control={control}
                    rules={{
                      required: "Mobile number is required",
                      maxLength: {
                        value: 10,
                        message: "Mobile number must be 10 digits",
                      },
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message:
                          "Invalid mobile number. It must contain only digits.",
                      },
                    }}
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
                    <Typography color="red" className="text-sm font-medium">
                      {errors.order_mobile.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-base font-semibold"
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
                    <Typography color="red" className="text-sm font-medium">
                      {errors.order_email.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-base font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Pincode
                  </Typography>
                  <Controller
                    name="order_pincode"
                    control={control}
                    rules={{
                      required: "Pincode is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Pincode must contain only digits",
                      },
                      minLength: {
                        value: 6,
                        message: "Pincode must be exactly 6 digits",
                      },
                      maxLength: {
                        value: 6,
                        message: "Pincode must be exactly 6 digits",
                      },
                    }}
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
                    <Typography color="red" className="text-sm font-medium">
                      {errors.order_pincode.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-base font-semibold"
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
                        <MenuItem value="delivered">Delivered</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.order_status && (
                    <Typography color="red" className="text-sm font-medium">
                      {errors.order_status.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-base font-semibold"
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
                    <Typography color="red" className="text-sm font-medium">
                      {errors.shipping_method.message}
                    </Typography>
                  )}
                </div>

                <div className="w-full mt-2">
                  <Typography
                    color="blue-gray"
                    className="text-base font-semibold"
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
                          error={errors.user_id}
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
                    <Typography color="red" className="text-sm font-medium">
                      {errors.user_id.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-base font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Order Items
                  </Typography>
                  <Card className="w-full overflow-y-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th
                              key={head.name}
                              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                {head.name}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {controlledFields.map((field, index) => {
                          const fieldArray = `order_items[${index}]`;
                          const isLast = index === controlledFields.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";

                          return (
                            <tr key={field.id}>
                              <td className={classes}>
                                <Controller
                                  name={`${fieldArray}.product_id`}
                                  control={control}
                                  rules={{ required: "Product is required" }}
                                  render={({ field: { onChange, value } }) => (
                                    <Select
                                      value={value}
                                      onChange={onChange}
                                      displayEmpty
                                      inputProps={{
                                        "aria-label": "Without label",
                                      }}
                                      fullWidth={true}
                                      sx={{ height: 45 }}
                                      error={
                                        errors?.order_items?.[index]?.product_id
                                      }
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
                                {errors?.order_items?.[index]?.product_id && (
                                  <Typography
                                    color="red"
                                    className="text-sm font-medium"
                                  >
                                    {
                                      errors?.order_items?.[index]?.product_id
                                        ?.message
                                    }
                                  </Typography>
                                )}
                              </td>
                              <td className={classes} width={20}>
                                <Controller
                                  name={`${fieldArray}.quantity`}
                                  control={control}
                                  rules={{
                                    required: "Quantity is required",
                                    pattern: {
                                      value: /^[0-9]+$/,
                                      message: "Quantity must be a number",
                                    },
                                  }}
                                  render={({ field }) => (
                                    <Input
                                      size="lg"
                                      {...field}
                                      placeholder="Quantity"
                                      className={borderForField(
                                        errors?.order_items?.[index]?.quantity
                                      )}
                                      labelProps={{
                                        className:
                                          "before:content-none after:content-none",
                                      }}
                                      error={
                                        errors?.order_items?.[index]?.quantity
                                      }
                                    />
                                  )}
                                />
                                {errors?.order_items?.[index]?.quantity && (
                                  <Typography
                                    color="red"
                                    className="text-sm font-medium"
                                  >
                                    {
                                      errors?.order_items?.[index]?.quantity
                                        ?.message
                                    }
                                  </Typography>
                                )}
                              </td>
                              <td className={classes} width={30}>
                                <IconButton
                                  variant="text"
                                  className="rounded-full"
                                  onClick={() => remove(index)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={3}>
                            <CardFooter className="flex items-center justify-between border-t border-blue-gray-100 p-4">
                              <Button
                                variant="outlined"
                                size="sm"
                                onClick={handleAddRow}
                              >
                                Add Row
                              </Button>
                            </CardFooter>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </Card>
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
