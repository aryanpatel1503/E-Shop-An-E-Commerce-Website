import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import {
  Button,
  Input,
  Radio,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { borderForField } from "../../lib/commonFunctions";
import { API_URL } from "../../lib/constant";
import { toast } from "react-toastify";

const AddUpdateCustomer = () => {
  const defaultValues = {
    user_name: "",
    user_fullname: "",
    user_mobile: "",
    user_email: "",
    user_password: "",
    user_gender: "",
    permanent_address: "",
    permanent_city: "",
    permanent_state: "",
    permanent_pincode: "",
    current_address: "",
    current_city: "",
    current_state: "",
    current_pincode: "",
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
        .put(`${API_URL}/users/${val}`, {
          ...values,
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success(
              response.data.message || "User Updated Successfully",
              {
                position: "top-center",
              }
            );
            navigate("/admin/viewuser");
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-center",
          });
        });
    } else {
      axios
        .post(`${API_URL}/register`, {
          ...values,
        })
        .then((response) => {
          toast.success("Customer added Successfully", {
            position: "top-center",
          });
          navigate("/admin/viewuser");
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-center",
          });
        });
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    handleSubmit(onSubmitData, onSubmitError)();
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/users/${val}`)
      .then((response) => {
        reset((formValues) => ({
          ...formValues,
          ...response.data[0],
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [name]);

  return (
    <div className="py-4 sm:ml-64">
      <div className="mt-10">
        <div className="h-20 flex justify-between items-center mb-2 px-4 bg-blue-100">
          <h3 className="text-2xl font-medium font-serif text-blue-500">
            {name ? "Edit Customer" : "Add Customer"}
          </h3>
          <NavLink
            to="/admin/viewuser"
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
                    Username
                  </Typography>
                  <Controller
                    name="user_name"
                    control={control}
                    rules={{ required: "Username is required" }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        size="lg"
                        placeholder="username"
                        onChange={onChange}
                        value={value}
                        className={borderForField(errors.user_name)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.user_name}
                      />
                    )}
                  />
                  {errors.user_name && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.user_name.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Full Name
                  </Typography>
                  <Controller
                    name="user_fullname"
                    control={control}
                    rules={{ required: "Full Name is required" }}
                    render={({ field }) => (
                      <Input
                        size="lg"
                        {...field}
                        placeholder="fullname"
                        className={borderForField(errors.user_fullname)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.user_fullname}
                      />
                    )}
                  />
                  {errors.user_fullname && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.user_fullname.message}
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
                    name="user_mobile"
                    control={control}
                    rules={{ required: "Mobile is required" }}
                    render={({ field }) => (
                      <Input
                        size="lg"
                        {...field}
                        placeholder="mobile"
                        className={borderForField(errors.user_mobile)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.user_mobile}
                      />
                    )}
                  />
                  {errors.user_mobile && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.user_mobile.message}
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
                    name="user_email"
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
                        className={borderForField(errors.user_email)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.user_email}
                      />
                    )}
                  />
                  {errors.user_email && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.user_email.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Password
                  </Typography>
                  <Controller
                    name="user_password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="password"
                        size="lg"
                        placeholder="********"
                        className={borderForField(errors.user_password)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.user_password}
                      />
                    )}
                  />
                  {errors.user_password && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.user_password.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Gender
                  </Typography>
                  <Controller
                    name="user_gender"
                    control={control}
                    rules={{ required: "Gender is required" }}
                    render={({ field: { onChange, value } }) => (
                      <div className="flex gap-10">
                        <Radio
                          name="user_gender"
                          label="Male"
                          value="male"
                          checked={value === "male"}
                          onChange={onChange}
                          error={errors.user_gender}
                        />
                        <Radio
                          name="user_gender"
                          label="Female"
                          value="female"
                          checked={value === "female"}
                          onChange={onChange}
                          error={errors.user_gender}
                        />
                      </div>
                    )}
                  />
                  {errors.user_gender && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.user_gender.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Permenent Address
                  </Typography>
                  <Controller
                    name="permanent_address"
                    control={control}
                    rules={{ required: "Permenent Address is required" }}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        size="lg"
                        className={`${borderForField(
                          errors.permanent_address
                        )}`}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.permanent_address}
                      />
                    )}
                  />
                  {errors.permanent_address && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.permanent_address.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Permenent City
                  </Typography>
                  <Controller
                    name="permanent_city"
                    control={control}
                    rules={{ required: "Permenent City is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="lg"
                        placeholder="permanent city"
                        className={borderForField(errors.permanent_city)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.permanent_city}
                      />
                    )}
                  />
                  {errors.permanent_city && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.permanent_city.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Permenent State
                  </Typography>
                  <Controller
                    name="permanent_state"
                    control={control}
                    rules={{ required: "Permenent State is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="lg"
                        placeholder="permanent state"
                        className={borderForField(errors.permanent_state)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.permanent_state}
                      />
                    )}
                  />
                  {errors.permanent_state && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.permanent_state.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Permenent Pincode
                  </Typography>
                  <Controller
                    name="permanent_pincode"
                    control={control}
                    rules={{ required: "Permenent Pincode is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="lg"
                        placeholder="permanent pincode"
                        className={borderForField(errors.permanent_pincode)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.permanent_pincode}
                      />
                    )}
                  />
                  {errors.permanent_pincode && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.permanent_pincode.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Current Address
                  </Typography>
                  <Controller
                    name="current_address"
                    control={control}
                    rules={{ required: "Current Address is required" }}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        size="lg"
                        rows="1"
                        className={borderForField(errors.current_address)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.current_address}
                      />
                    )}
                  />
                  {errors.current_address && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.current_address.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Current City
                  </Typography>
                  <Controller
                    name="current_city"
                    control={control}
                    rules={{ required: "Current City is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="lg"
                        placeholder="current city"
                        className={borderForField(errors.current_city)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.current_city}
                      />
                    )}
                  />
                  {errors.current_city && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.current_city.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Current State
                  </Typography>
                  <Controller
                    name="current_state"
                    control={control}
                    rules={{ required: "Current State is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="lg"
                        placeholder="current state"
                        className={borderForField(errors.current_state)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.current_state}
                      />
                    )}
                  />
                  {errors.current_state && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.current_state.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
                  >
                    <span className="text-red-500 font-semibold mr-1">*</span>
                    Current Pincode
                  </Typography>
                  <Controller
                    name="current_pincode"
                    control={control}
                    rules={{ required: "Current Pincode is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="lg"
                        placeholder="current pincode"
                        className={borderForField(errors.current_pincode)}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={errors.current_pincode}
                      />
                    )}
                  />
                  {errors.current_pincode && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.current_pincode.message}
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
                onClick={handleAddUser}
              >
                {name ? "Update Customer" : "Add Customer"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateCustomer;
