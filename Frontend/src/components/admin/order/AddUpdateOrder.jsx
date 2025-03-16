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
import {
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import AdminLayout from "../AdminLayout";
import DeleteIcon from "@mui/icons-material/Delete";

const AddUpdateOrder = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

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
    order_items: [{ product_id: "", quantity: "", price: 0, subtotal: 0 }],
  };
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });
  const { fields, append, remove, update } = useFieldArray({
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
      price: 0,
      subtotal: 0,
    });
  };

  const setTotalAmount = (data) => {
    const totalAmount = parseFloat(
      data?.reduce(
        (acc, item) =>
          acc +
          parseFloat(item.price) *
            parseFloat(!isblank(item.quantity) ? item.quantity : 0),
        0
      )
    ).toFixed(2);
    setValue("total_amount", totalAmount);
  };

  const handleProductChange = (val, field, index, onChange) => {
    onChange(val);
    const product = allProducts?.find((item) => item.product_id === val);
    const qty = parseFloat(!isblank(field.quantity) ? field.quantity : 0);

    const orderItems = controlledFields?.map((item, ind) => {
      const updated = { ...item };
      if (index === ind) {
        updated.product_id = val;
        updated.quantity = qty;
        updated.price = parseFloat(product?.product_price);
      }
      return updated;
    });

    orderItems.forEach((item, ind) => {
      if (index === ind) {
        setValue(
          `order_items[${index}].price`,
          parseFloat(product?.product_price)
        );
        setValue(
          `order_items[${index}].subtotal`,
          parseFloat(product?.product_price) * qty
        );
      }
    });

    setTotalAmount(orderItems);
  };

  const handleQtyChange = (val, field, index, onChange) => {
    onChange(val);
    const qty = parseFloat(!isblank(val) ? val : 0);
    const price = parseFloat(!isblank(field.price) ? field.price : 0);

    const orderItems = controlledFields?.map((item, ind) => {
      const updated = { ...item };
      if (index === ind) {
        updated.product_id = field.product_id;
        updated.quantity = qty;
        updated.price = price;
      }
      return updated;
    });

    orderItems.forEach((item, ind) => {
      if (index === ind) {
        setValue(`order_items[${index}].subtotal`, price * qty);
      }
    });

    setTotalAmount(orderItems);
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
              price: item.price,
              subtotal: parseFloat(item.price) * parseFloat(item.quantity),
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
    <AdminLayout
      title={name ? "Edit Order" : "Add Order"}
      actionName="Back"
      actionPath="/admin/vieworder"
    >
      <div className="flex justify-center">
        <div className="w-11/12 md:w-8/12 bg-white rounded-md flex flex-col items-center">
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
                      containerProps={{
                        className: "!min-w-0",
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
                      containerProps={{
                        className: "!min-w-0",
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
                      containerProps={{
                        className: "!min-w-0",
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
                      containerProps={{
                        className: "!min-w-0",
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
                      containerProps={{
                        className: "!min-w-0",
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
                      containerProps={{
                        className: "!min-w-0",
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
                      containerProps={{
                        className: "!min-w-0",
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

                <TableContainer component={Paper} className="overflow-hidden">
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                    className="overflow-hidden"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell width={60}>Quantity</TableCell>
                        <TableCell width={110}>Price</TableCell>
                        <TableCell width={110}>Subtotal</TableCell>
                        <TableCell width={50}></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {controlledFields.map((field, index) => {
                        const fieldArray = `order_items[${index}]`;
                        return (
                          <TableRow
                            key={field.id}
                            // sx={{
                            //   "&:last-child td, &:last-child th": {
                            //     border: 0,
                            //   },
                            // }}
                          >
                            <TableCell component="th" scope="row">
                              {/* <div className="max-w-xs"> */}
                              <Controller
                                name={`${fieldArray}.product_id`}
                                control={control}
                                rules={{ required: "Product is required" }}
                                render={({ field: { onChange, value } }) => (
                                  <Select
                                    value={value}
                                    onChange={(e) =>
                                      handleProductChange(
                                        e.target.value,
                                        field,
                                        index,
                                        onChange
                                      )
                                    }
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    fullWidth={true}
                                    sx={{ height: 45, width: 330 }}
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
                              {/* </div> */}
                            </TableCell>
                            <TableCell width={60}>
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
                                render={({ field: { value, onChange } }) => (
                                  <Input
                                    size="lg"
                                    value={value}
                                    onChange={(e) =>
                                      handleQtyChange(
                                        e.target.value,
                                        field,
                                        index,
                                        onChange
                                      )
                                    }
                                    placeholder="Quantity"
                                    className={borderForField(
                                      errors?.order_items?.[index]?.quantity
                                    )}
                                    labelProps={{
                                      className:
                                        "before:content-none after:content-none",
                                    }}
                                    containerProps={{
                                      className: "min-w-[60px]",
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
                            </TableCell>
                            <TableCell width={110}>
                              <Controller
                                name={`${fieldArray}.price`}
                                control={control}
                                rules={{
                                  required: "Price is required",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Price must be a number",
                                  },
                                }}
                                render={({ field }) => (
                                  <Input
                                    size="md"
                                    {...field}
                                    placeholder="Price"
                                    className={borderForField(
                                      errors?.order_items?.[index]?.price
                                    )}
                                    labelProps={{
                                      className:
                                        "before:content-none after:content-none",
                                    }}
                                    containerProps={{
                                      className: "!min-w-[110px]",
                                    }}
                                    error={errors?.order_items?.[index]?.price}
                                    disabled={true}
                                  />
                                )}
                              />
                              {errors?.order_items?.[index]?.price && (
                                <Typography
                                  color="red"
                                  className="text-sm font-medium"
                                >
                                  {errors?.order_items?.[index]?.price?.message}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell width={110} align="right">
                              <Typography>{field.subtotal}</Typography>
                            </TableCell>
                            <TableCell width={50}>
                              <IconButton
                                variant="text"
                                className="rounded-full"
                                onClick={() => remove(index)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <Button
                            variant="outlined"
                            size="sm"
                            onClick={handleAddRow}
                          >
                            Add Row
                          </Button>
                        </TableCell>
                        <TableCell colSpan={2} align="right">
                          <Typography className="text-base font-semibold">
                            {parseFloat(formValues.total_amount).toFixed(2)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </div>
            </div>

            <Button
              variant="filled"
              className="mt-6 bg-green-500 text-white 
               text-base font-medium rounded-md hover:bg-green-600 capitalize"
              fullWidth
              type="submit"
              onClick={handleAddOrder}
            >
              {name ? "Update Order" : "Add Order"}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddUpdateOrder;
