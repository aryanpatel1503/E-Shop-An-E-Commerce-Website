import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useForm, Controller } from "react-hook-form";
import loginimg from "../../../assets/login1.png";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Radio,
  Textarea,
} from "@material-tailwind/react";
import { borderForField } from "../../lib/commonFunctions";

const SignUp = () => {
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
    formState: { errors },
  } = useForm({ defaultValues });
  const navigate = useNavigate();
  const formValues = watch();

  const onSubmitData = (values) => {
    console.log(values);
  };

  const onSubmitError = (values) => {
    console.log(values);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    handleSubmit(onSubmitData, onSubmitError)();
  };

  return (
    <div
      className="mx-auto flex flex-wrap justify-center items-center h-screen"
      style={{
        background: "linear-gradient(to top, #198754 0%, #6c757d 100%)",
      }}
    >
      <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center h-[90%] bg-white shadow-lg rounded-tl-lg rounded-bl-lg">
        <img
          src={loginimg}
          alt="login"
          className="object-scale-down rounded-lg"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 h-[90%] overflow-y-auto bg-[#f5f5f5] shadow-lg rounded-tr-lg rounded-br-lg px-7 py-4">
        <Typography variant="h4" className="text-center">
          Registration
        </Typography>

        <Card color="transparent" shadow={false} className="w-full">
          <form className="mt-5 mb-2 w-[80%] flex flex-col self-center">
            <div className="mb-1 flex flex-col gap-4">
              <div>
                <Typography color="blue-gray" className="text-md font-medium">
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
                <Typography color="blue-gray" className="text-md font-medium">
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
                <Typography color="blue-gray" className="text-md font-medium">
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
                <Typography color="blue-gray" className="text-sm font-medium">
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
                <Typography color="blue-gray" className="text-sm font-medium">
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
                <Typography color="blue-gray" className="text-sm font-medium">
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
                <Typography color="blue-gray" className="text-sm font-medium">
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
                      className={borderForField(errors.permanent_address)}
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
                <Typography color="blue-gray" className="text-sm font-medium">
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
                <Typography color="blue-gray" className="text-sm font-medium">
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
                <Typography color="blue-gray" className="text-sm font-medium">
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
                <Typography color="blue-gray" className="text-sm font-medium">
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
                <Typography color="blue-gray" className="text-sm font-medium">
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
                <Typography color="blue-gray" className="text-sm font-medium">
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
                <Typography color="blue-gray" className="text-sm font-medium">
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
              className="mt-6 bg-[#5479F7]"
              fullWidth
              type="submit"
              onClick={handleSignIn}
            >
              Submit
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account? {""}
              <NavLink className="font-semibold text-[#5479F7]" to="/login">
                Sign In
              </NavLink>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
