import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { borderForField } from "../../lib/commonFunctions";
import { Button, Input, Typography } from "@material-tailwind/react";
import { API_URL } from "../../lib/constant";

const AddUpdateCategory = () => {
  const defaultValues = {
    category: "",
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

  const onSubmitError = (values) => {
    console.log(values);
  };

  const onSubmitData = (values) => {
    if (name) {
      axios
        .put(`http://localhost:3001/category/${name}`, {
          ...values,
        })
        .then((response) => {
          if (response) {
            alert("Category Updated Successfully");
            navigate("/admin/viewcategory");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:3001/category/add", {
          ...values,
        })
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.message || "Category added Successfully");
            navigate("/admin/viewcategory");
          }
        });
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    handleSubmit(onSubmitData, onSubmitError)();
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/category/${val}`)
      .then((response) => {
        reset((formValues) => ({
          ...formValues,
          ...response.data.result[0],
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [name]);

  return (
    <>
      <div className="py-4 sm:ml-64">
        <div className="mt-10">
          <div className="h-20 flex justify-between items-center mb-2 px-4 bg-blue-100">
            <h3 className="text-2xl font-medium font-serif text-blue-500">
              {name ? "Edit Category" : "Add Category"}
            </h3>
            <NavLink
              to="/admin/viewcategory"
              className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <ArrowBackRoundedIcon className="mr-1" />
              Back
            </NavLink>
          </div>
          <div className="flex justify-center">
            <div className="w-8/12 bg-white rounded-md ">
              <form className="w-full flex flex-col items-center my-10">
                <div className="w-11/12">
                  <Typography
                    color="blue-gray"
                    className="text-md font-semibold"
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
                        error={errors.category}
                      />
                    )}
                  />
                  {errors.category && (
                    <Typography color="red" className="text-md font-medium">
                      {errors.category.message}
                    </Typography>
                  )}
                  <Button
                    variant="filled"
                    className="mt-8 bg-green-500 text-white 
               text-md font-medium rounded-md hover:bg-green-600 capitalize"
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
        </div>
      </div>
    </>
  );
};

export default AddUpdateCategory;
