import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import loginimg from "../../../assets/login1.png";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { borderForField } from "../../lib/commonFunctions";
import { API_URL } from "../../lib/constant";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const defaultValues = {
    user_email: "",
    user_password: "",
    user_conf_password: "",
  };
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });
  const formValues = watch();
  const navigate = useNavigate();

  const confirmPasswordValidate = (value) => {
    if (value === formValues.user_password) {
      return true;
    } else {
      return "Passwords do not match";
    }
  };

  const onSubmitData = (values) => {
    axios
      .put(`${API_URL}/resetpassword`, {
        user_email: values.user_email,
        user_password: values.user_password,
      })
      .then((response) => {
        if (response.data.result.affectedRows == 0) {
          toast.warning("Email is not Registred! Please Register Yourself", {
            position: "top-center",
          });
        } else {
          toast.success("Password reset successfully", {
            position: "top-center",
          });
          navigate("/login");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
        });
      });
  };

  const onSubmitError = () => {};

  const handleSignIn = (e) => {
    e.preventDefault();
    handleSubmit(onSubmitData, onSubmitError)();
  };
  return (
    <div
      className="mx-auto p-4 lg:p-0 flex flex-col md:flex-row justify-center items-center md:h-screen"
      style={{
        background: "linear-gradient(to top, #198754 0%, #6c757d 100%)",
      }}
    >
      <div className="w-full sm:w-2/3 lg:w-1/3 flex justify-center items-center h-[300px] md:h-[445px] bg-white shadow-lg rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg">
        <img
          src={loginimg}
          alt="login"
          className="object-contain h-[95%] md:h-[85%]"
        />
      </div>
      <div className="w-full sm:w-2/3 lg:w-1/3 md:h-[445px] bg-[#f5f5f5] shadow-lg md:rounded-tr-lg rounded-br-lg rounded-bl-lg md:rounded-bl-none px-4 md:px-7 py-4">
        <Typography variant="h4" className="text-center">
          Reset Password
        </Typography>

        <Card color="transparent" shadow={false} className="w-full">
          <form className="mt-5 mb-2 w-full flex flex-col self-center">
            <div className="mb-1 flex flex-col space-y-[1px] w-full">
              <div>
                <Typography color="blue-gray" className="text-base font-medium">
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
                      containerProps={{
                        className: "!min-w-0",
                      }}
                      error={errors.user_email}
                    />
                  )}
                />
                <Typography color="red" className="text-sm font-medium">
                  {errors.user_email ? errors.user_email.message : "\u00A0"}
                </Typography>
              </div>

              <div>
                <Typography color="blue-gray" className="text-base font-medium">
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
                      containerProps={{
                        className: "!min-w-0",
                      }}
                      error={errors.user_password}
                    />
                  )}
                />
                <Typography color="red" className="text-sm font-medium">
                  {errors.user_password
                    ? errors.user_password?.message
                    : "\u00A0"}
                </Typography>
              </div>

              <div>
                <Typography color="blue-gray" className="text-base font-medium">
                  Confirm Password
                </Typography>
                <Controller
                  name="user_conf_password"
                  control={control}
                  rules={{
                    required: "Confirm Password is required",
                    validate: confirmPasswordValidate,
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      size="lg"
                      placeholder="********"
                      className={borderForField(errors.user_conf_password)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "!min-w-0",
                      }}
                      error={errors.user_conf_password}
                    />
                  )}
                />

                <Typography color="red" className="text-sm font-medium">
                  {errors.user_conf_password
                    ? errors.user_conf_password?.message
                    : "\u00A0"}
                </Typography>
              </div>
            </div>

            <Button
              variant="filled"
              className="mt-3 bg-[#5479F7] tracking-wide"
              fullWidth
              type="submit"
              onClick={handleSignIn}
            >
              Submit
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              New user? Click here to {""}
              <NavLink className="font-semibold text-[#5479F7]" to="/signup">
                Register
              </NavLink>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
