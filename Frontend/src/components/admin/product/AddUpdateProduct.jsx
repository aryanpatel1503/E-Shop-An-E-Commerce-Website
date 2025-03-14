import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Input,
  // Option,
  // Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { borderForField, getBase64 } from "../../lib/commonFunctions";
import { API_URL } from "../../lib/constant";
import { FormControl, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import AdminLayout from "../AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingStop } from "../../redux/cartSlice";

const AddUpdateProduct = () => {
  const defaultValues = {
    product_name: "",
    product_desc: "",
    product_img: "",
    product_price: "",
    product_color: "",
    product_size: "",
    product_storage: "",
    product_brand: "",
    product_special_features: "",
    product_weight: "",
    product_height: "",
    product_warranty: "",
    product_guarantee: "",
    product_info: "",
    category_id: "",
  };
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });
  const formValues = watch();
  const { name } = useParams();
  const val = name?.replaceAll("_", " ");

  const [categoryAll, setCategoryAll] = useState([]);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getCategory = async () => {
    const response = await axios.get(`${API_URL}/category`);
    setCategoryAll(response.data.result);
  };

  const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    setUsers(response.data.result);
  };

  useEffect(() => {
    getCategory();
    getUsers();
  }, []);

  const imgUpload = async (e, onChange) => {
    const base64 = await getBase64(e);
    onChange(base64);
  };

  const onSubmitError = (values) => {
    console.log(values);
  };

  const onSubmitData = async (values) => {
    if (name) {
      axios
        .put(`${API_URL}/products/${val}`, {
          ...values,
        })
        .then((response) => {
          if (response) {
            toast.success("Product Updated Successfully", {
              position: "top-center",
            });
            navigate("/admin/viewproduct");
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-center",
          });
        });
    } else {
      dispatch(loadingStart());
      axios
        .post(`${API_URL}/products/add`, {
          ...values,
        })
        .then((response) => {
          axios
            .post(`${API_URL}/send-email`, {
              email: users.map((item) => item.user_email),
              product: values.product_name,
              price: values.product_price,
              image: values.product_img,
            })
            .then((response) => {
              dispatch(loadingStop());
              toast.success("Product added successfully", {
                position: "top-center",
              });
              navigate("/admin/viewproduct");
              console.log("Email sent successfully:", response.data);
            })
            .catch((error) => {
              dispatch(loadingStop());
              console.error("Error sending email:", error);
            });
        })
        .catch((err) => {
          dispatch(loadingStop());
          toast.error(err.response.data.message, {
            position: "top-center",
          });
        });
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    handleSubmit(onSubmitData, onSubmitError)();
  };

  useEffect(() => {
    if (name) {
      axios
        .get(`${API_URL}/products/${val}`)
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

  return (
    <AdminLayout>
      <div className="">
        <div className="h-20 flex justify-between items-center mb-2 px-4 bg-blue-100">
          <h3 className="text-2xl font-medium font-serif text-blue-500">
            {name ? "Edit Product" : "Add Product"}
          </h3>
          <NavLink
            to="/admin/viewproduct"
            className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <ArrowBackRoundedIcon className="mr-1" />
            Back
          </NavLink>
        </div>
        <div className="flex justify-center">
          <div className="w-8/12 bg-white rounded-md flex flex-col items-center">
            <form className="w-11/12 flex flex-col items-center justify-center mt-1 mb-10 space-y-4">
              <div className="w-full">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Product name
                </Typography>
                <Controller
                  name="product_name"
                  control={control}
                  rules={{ required: "Product name is required" }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      size="lg"
                      placeholder="product name"
                      onChange={onChange}
                      value={value}
                      className={borderForField(errors.product_name)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      error={errors.product_name}
                    />
                  )}
                />
                {errors.product_name && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.product_name.message}
                  </Typography>
                )}
              </div>

              <div className="w-full">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Description
                </Typography>
                <Controller
                  name="product_desc"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      size="lg"
                      className={`${borderForField(errors.product_desc)}`}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      error={errors.product_desc}
                    />
                  )}
                />
                {errors.product_desc && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.product_desc.message}
                  </Typography>
                )}
              </div>

              <div className="w-full">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Image
                </Typography>
                <Controller
                  name="product_img"
                  control={control}
                  rules={{ required: "Image is required" }}
                  render={({ field: { onChange, value } }) => (
                    <input
                      type="file"
                      name="product_img"
                      onChange={(e) => imgUpload(e, onChange)}
                      placeholder="Image"
                      className={`w-full px-3 py-3 border rounded-md ${
                        errors.product_img ? "border-red-600" : ""
                      } `}
                      required
                    />
                  )}
                />
                {errors.product_img && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.product_img.message}
                  </Typography>
                )}
              </div>

              <div className="w-full">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Price
                </Typography>
                <Controller
                  name="product_price"
                  control={control}
                  rules={{ required: "Price is required" }}
                  render={({ field }) => (
                    <Input
                      size="lg"
                      placeholder="Price"
                      {...field}
                      className={borderForField(errors.product_price)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      error={errors.product_price}
                    />
                  )}
                />
                {errors.product_price && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.product_price.message}
                  </Typography>
                )}
              </div>

              <div className="w-full">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Color
                </Typography>
                <Controller
                  name="product_color"
                  control={control}
                  rules={{ required: "Color is required" }}
                  render={({ field }) => (
                    <Input
                      size="lg"
                      placeholder="Color"
                      {...field}
                      className={borderForField(errors.product_color)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      error={errors.product_color}
                    />
                  )}
                />
                {errors.product_color && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.product_color.message}
                  </Typography>
                )}
              </div>

              <div className="w-full">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Size
                </Typography>
                <Controller
                  name="product_size"
                  control={control}
                  rules={{ required: "Size is required" }}
                  render={({ field }) => (
                    <Input
                      size="lg"
                      placeholder="Size"
                      {...field}
                      className={borderForField(errors.product_size)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      error={errors.product_size}
                    />
                  )}
                />
                {errors.product_size && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.product_size.message}
                  </Typography>
                )}
              </div>

              <div className="w-full">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Storage
                </Typography>
                <Controller
                  name="product_storage"
                  control={control}
                  rules={{ required: "Storage is required" }}
                  render={({ field }) => (
                    <Input
                      size="lg"
                      placeholder="Storage"
                      {...field}
                      className={borderForField(errors.product_storage)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      error={errors.product_storage}
                    />
                  )}
                />
                {errors.product_storage && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.product_storage.message}
                  </Typography>
                )}
              </div>

              <div className="w-full">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Brand
                </Typography>
                <Controller
                  name="product_brand"
                  control={control}
                  rules={{ required: "Brand is required" }}
                  render={({ field }) => (
                    <Input
                      size="lg"
                      placeholder="Brand"
                      {...field}
                      className={borderForField(errors.product_brand)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      error={errors.product_brand}
                    />
                  )}
                />
                {errors.product_brand && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.product_brand.message}
                  </Typography>
                )}
              </div>

              <div className="w-full">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Special Features
                </Typography>
                <Controller
                  name="product_special_features"
                  control={control}
                  rules={{ required: "Special Features is required" }}
                  render={({ field }) => (
                    <Input
                      size="lg"
                      placeholder="Special Features"
                      {...field}
                      className={borderForField(
                        errors.product_special_features
                      )}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      error={errors.product_special_features}
                    />
                  )}
                />
                {errors.product_special_features && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.product_special_features.message}
                  </Typography>
                )}
              </div>

              <div className="w-full">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Weight
                </Typography>
                <Controller
                  name="product_weight"
                  control={control}
                  rules={{ required: "Weight is required" }}
                  render={({ field }) => (
                    <Input
                      size="lg"
                      placeholder="Weight"
                      {...field}
                      className={borderForField(errors.product_weight)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      error={errors.product_weight}
                    />
                  )}
                />
                {errors.product_weight && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.product_weight.message}
                  </Typography>
                )}
              </div>

              <div className="w-full">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Height
                </Typography>
                <Controller
                  name="product_height"
                  control={control}
                  rules={{ required: "Height is required" }}
                  render={({ field }) => (
                    <Input
                      size="lg"
                      placeholder="Height"
                      {...field}
                      className={borderForField(errors.product_height)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      error={errors.product_height}
                    />
                  )}
                />
                {errors.product_height && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.product_height.message}
                  </Typography>
                )}
              </div>

              <div className="w-full">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Warranty
                </Typography>
                <Controller
                  name="product_warranty"
                  control={control}
                  rules={{ required: "Warranty is required" }}
                  render={({ field }) => (
                    <Input
                      size="lg"
                      placeholder="Warranty"
                      {...field}
                      className={borderForField(errors.product_warranty)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      error={errors.product_warranty}
                    />
                  )}
                />
                {errors.product_warranty && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.product_warranty.message}
                  </Typography>
                )}
              </div>

              <div className="w-full">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Guarantee
                </Typography>
                <Controller
                  name="product_guarantee"
                  control={control}
                  rules={{ required: "Guarantee is required" }}
                  render={({ field }) => (
                    <Input
                      size="lg"
                      placeholder="Guarantee"
                      {...field}
                      className={borderForField(errors.product_guarantee)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      error={errors.product_guarantee}
                    />
                  )}
                />
                {errors.product_guarantee && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.product_guarantee.message}
                  </Typography>
                )}
              </div>

              <div className="w-full">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Info
                </Typography>
                <Controller
                  name="product_info"
                  control={control}
                  rules={{ required: "Info is required" }}
                  render={({ field }) => (
                    <Input
                      size="lg"
                      placeholder="Info"
                      {...field}
                      className={borderForField(errors.product_info)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      error={errors.product_info}
                    />
                  )}
                />
                {errors.product_info && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.product_info.message}
                  </Typography>
                )}
              </div>

              <div className="w-full mt-2">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Category
                </Typography>
                {/* <Controller
                    name="category_id"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        value={String(value)}
                        onChange={(val) => onChange(val)}
                        placeholder="Select Category"
                        className={borderForField(errors.category_id)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.category_id}
                      >
                        <Option value="12">Laptop</Option>
                        {categoryAll.map((item, index) => {
                          const updatedItem = item;
                          updatedItem.category_id = item.category_id.toString();
                          return (
                            <Option
                              key={updatedItem.category_id}
                              value={updatedItem.category}
                            >
                              {updatedItem.category}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  /> */}
                <FormControl sx={{ minWidth: "100%" }}>
                  <Controller
                    name="category_id"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        value={value}
                        onChange={onChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        fullWidth={true}
                        sx={{ height: 45 }}
                      >
                        {categoryAll.map((item, index) => {
                          const updatedItem = item;
                          updatedItem.category_id = item.category_id.toString();
                          return (
                            <MenuItem
                              key={updatedItem.category_id}
                              value={updatedItem.category_id}
                            >
                              {updatedItem.category}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.category_id && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.category_id.message}
                  </Typography>
                )}
              </div>

              <Button
                variant="filled"
                className="mt-6 bg-green-500 text-white 
               text-base font-medium rounded-md hover:bg-green-600 capitalize"
                fullWidth
                type="submit"
                onClick={handleAddProduct}
              >
                {name ? "Update Product" : "Add Product"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddUpdateProduct;
