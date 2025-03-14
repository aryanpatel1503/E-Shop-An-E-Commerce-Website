import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
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

const AdminLogin = ({ setLogin }) => {
  const defaultValues = {
    admin_name: "",
    admin_password: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const navigate = useNavigate();
  const islogin = localStorage.getItem("adminData");

  const onSubmitData = (values) => {
    axios
      .post(`${API_URL}/admin`, {
        ...values,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem(
            "adminData",
            JSON.stringify(response.data.result[0])
          );
          if (setLogin) {
            setLogin(true);
            navigate("/admin/dashboard");
          }
        }
      })
      .catch((err) => {
        console.log(err);
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
    // localStorage.removeItem("adminData");
  }, []);

  if (islogin) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div
      className="mx-auto p-4 lg:p-0 flex flex-col md:flex-row justify-center items-center md:h-screen"
      style={{
        background: "linear-gradient(to top, #198754 0%, #6c757d 100%)",
      }}
    >
      <div className="w-full sm:w-2/3 lg:w-1/3 flex justify-center items-center h-[300px] md:h-[395px] bg-white shadow-lg rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg">
        <img
          src={loginimg}
          alt="login"
          className="object-contain h-[95%] md:h-[85%]"
        />
      </div>
      <div className="w-full sm:w-2/3 lg:w-1/3 md:h-[395px] bg-[#f5f5f5] shadow-lg md:rounded-tr-lg rounded-br-lg rounded-bl-lg md:rounded-bl-none px-4 md:px-7 py-4">
        <Typography variant="h4" className="text-center">
          Admin Login
        </Typography>

        <Card color="transparent" shadow={false} className="w-full">
          <form className="mt-5 mb-2 w-full flex flex-col self-center">
            <div className="mb-1 flex flex-col gap-4 space-y-[1px] w-full">
              <div>
                <Typography color="blue-gray" className="text-base font-medium">
                  Name
                </Typography>
                <Controller
                  name="admin_name"
                  control={control}
                  rules={{ required: "Admin name is required" }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      size="lg"
                      placeholder="Admin name"
                      onChange={onChange}
                      value={value}
                      className={borderForField(errors.admin_name)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      error={errors.admin_name}
                    />
                  )}
                />
                {errors.admin_name && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.admin_name.message}
                  </Typography>
                )}
              </div>

              <div>
                <Typography color="blue-gray" className="text-base font-medium">
                  Password
                </Typography>
                <Controller
                  name="admin_password"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      size="lg"
                      placeholder="********"
                      className={borderForField(errors.admin_password)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      error={errors.admin_password}
                    />
                  )}
                />
                {errors.admin_password && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.admin_password.message}
                  </Typography>
                )}
              </div>
            </div>

            <Button
              variant="filled"
              className="mt-6 bg-[#5479F7] tracking-widest"
              fullWidth
              type="submit"
              onClick={handleSignIn}
            >
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
