import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { borderForField, getBase64 } from "../../lib/commonFunctions";
import { Button, Input, Typography } from "@material-tailwind/react";
import { API_URL } from "../../lib/constant";
import { toast } from "react-toastify";
import AdminLayout from "../AdminLayout";

const AddUpdateCategory = () => {
  const defaultValues = {
    category: "",
    category_img: "",
  };
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  const formValues = watch();

  const navigate = useNavigate();
  const { name } = useParams();
  const val = name?.replaceAll("_", " ");

  const imgUpload = async (e, onChange) => {
    const base64 = await getBase64(e);
    onChange(base64);
  };

  const onSubmitError = (values) => {
    console.log(values);
  };

  const onSubmitData = (values) => {
    if (name) {
      axios
        .put(`${API_URL}/category/${name}`, {
          ...values,
        })
        .then((response) => {
          if (response) {
            toast.success(
              response.data.message || "Category Updated Successfully",
              {
                position: "top-center",
              }
            );
            navigate("/admin/viewcategory");
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-center",
          });
        });
    } else {
      axios
        .post(`${API_URL}/category/add`, {
          ...values,
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success(
              response.data.message || "Category added Successfully",
              {
                position: "top-center",
              }
            );
            navigate("/admin/viewcategory");
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-center",
          });
        });
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    handleSubmit(onSubmitData, onSubmitError)();
  };

  useEffect(() => {
    if (name) {
      axios
        .get(`${API_URL}/getCategory/${val}`)
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
    <AdminLayout
      title={name ? "Edit Category" : "Add Category"}
      actionName="Back"
      actionPath="/admin/viewcategory"
    >
      <div className="flex justify-center">
        <div className="w-11/12 md:w-8/12 bg-white rounded-md flex flex-col items-center">
          <form className="w-11/12 flex flex-col items-center my-10">
            <div className="w-full space-y-4">
              <div className="w-full">
                <Typography
                  color="blue-gray"
                  className="text-base font-semibold"
                >
                  <span className="text-red-500 font-semibold mr-1">*</span>
                  Category Name
                </Typography>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category name is required" }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      size="lg"
                      placeholder="Category"
                      onChange={onChange}
                      value={value}
                      className={borderForField(errors.category)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "!min-w-0",
                      }}
                      error={errors.category}
                    />
                  )}
                />
                {errors.category && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.category.message}
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
                  name="category_img"
                  control={control}
                  rules={{ required: "Image is required" }}
                  render={({ field: { onChange, value } }) => (
                    <input
                      type="file"
                      name="category_img"
                      onChange={(e) => imgUpload(e, onChange)}
                      placeholder="Image"
                      className="w-full px-3 py-3 border rounded-md"
                      required
                    />
                  )}
                />
                {errors.category_img && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.category_img.message}
                  </Typography>
                )}
              </div>

              <Button
                variant="filled"
                className="mt-8 bg-green-500 text-white 
               text-base font-medium rounded-md hover:bg-green-600 capitalize"
                fullWidth
                type="submit"
                onClick={handleAddCategory}
              >
                {name ? "Update Category" : "Add Category"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddUpdateCategory;
