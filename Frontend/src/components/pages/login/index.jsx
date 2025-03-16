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
import {
  borderForField,
  decryptData,
  encryptData,
  isblank,
} from "../../lib/commonFunctions";
import { API_URL } from "../../lib/constant";
import { toast } from "react-toastify";

const Login = () => {
  const defaultValues = {
    user_name: "",
    user_password: "",
    remember_me: false,
  };
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });
  const navigate = useNavigate();
  const formValues = watch();

  const onSubmitData = (values) => {
    axios
      .post(`${API_URL}/login`, {
        ...values,
      })
      .then((response) => {
        if (response.status === 200) {
          // toast.success(response.data.message, {
          //   position: "top-center",
          // });
          localStorage.setItem("user_name", response.data.result[0].user_name);
          localStorage.setItem("user_id", response.data.result[0].user_id);
          navigate("/");

          if (values.remember_me) {
            localStorage.setItem(
              "remember_me",
              encryptData({
                user_name: response.data.result[0].user_name,
                user_password: response.data.result[0].user_password,
              })
            );
          } else {
            localStorage.removeItem("remember_me");
          }
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

  useEffect(() => {
    const rememberMeData = localStorage.getItem("remember_me");
    if (!isblank(rememberMeData)) {
      const decryptedData = decryptData(rememberMeData);
      setValue("user_name", decryptedData.user_name);
      setValue("user_password", decryptedData.user_password);
    }
  }, []);

  return (
    <div
      className="mx-auto p-4 lg:p-0 flex flex-col md:flex-row justify-center items-center md:h-screen"
      style={{
        background: "linear-gradient(to top, #198754 0%, #6c757d 100%)",
      }}
    >
      <div className="w-full sm:w-2/3 lg:w-1/3 flex justify-center items-center h-[300px] md:h-[408px] bg-white shadow-lg rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg">
        <img
          src={loginimg}
          alt="login"
          className="object-contain h-[95%] md:h-[85%]"
        />
      </div>
      <div className="w-full sm:w-2/3 lg:w-1/3 md:h-[408px] bg-[#f5f5f5] shadow-lg md:rounded-tr-lg rounded-br-lg rounded-bl-lg md:rounded-bl-none px-4 md:px-7 py-4">
        <Typography variant="h4" className="text-center">
          Login
        </Typography>

        <Card color="transparent" shadow={false} className="w-full">
          <form className="mt-5 mb-2 w-full flex flex-col self-center">
            <div className="mb-1 flex flex-col space-y-[1px] w-full">
              <div>
                <Typography color="blue-gray" className="text-base font-medium">
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
                      containerProps={{
                        className: "!min-w-0",
                      }}
                      error={errors.user_name}
                    />
                  )}
                />

                <Typography color="red" className="text-sm font-medium">
                  {errors.user_name ? errors.user_name.message : "\u00A0"}
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
                    ? errors.user_password.message
                    : "\u00A0"}
                </Typography>

                <div className="flex flex-wrap justify-between items-center md:gap-2">
                  <Controller
                    name="remember_me"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        type="password"
                        size="lg"
                        label="Remember me"
                        className={borderForField(errors.remember_me)}
                        labelProps={{
                          className:
                            "before:content-none after:content-none font-normal",
                        }}
                        containerProps={{
                          className: "-mt-1",
                        }}
                        error={errors.remember_me}
                      />
                    )}
                  />

                  <NavLink to="/resetpassword">Forget Password?</NavLink>
                </div>
              </div>
            </div>

            <Button
              variant="filled"
              className="mt-3 bg-[#5479F7] tracking-widest"
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

export default Login;
