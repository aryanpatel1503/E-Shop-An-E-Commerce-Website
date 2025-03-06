import React, { useEffect, useState } from "react";
import Layout from "../../app/Layout";
import {
  Button,
  Card,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { borderForField } from "../../lib/commonFunctions";
import profileImage from "../../../assets/profile.png";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../lib/constant";
import axios from "axios";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { Avatar } from "@mui/material";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [productData, setProductData] = useState({});
  const [feedbackData, setFeedbackData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const user_name = localStorage.getItem("user_name");

  const defaultValues = {
    feedback: "",
    user_id: user_id,
    product_id: id,
  };
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  const dispatch = useDispatch();

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(productData));
  };

  const handleBuyNow = () => {
    if (user_id) {
      navigate("/checkout", { state: { id: productData.product_id } });
    } else {
      navigate("/login");
    }
  };

  const onSubmitData = (values) => {
    axios
      .post(`${API_URL}/feedback/add`, {
        ...values,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Review added successfully", {
            position: "top-center",
          });
          reset();
          getFeedback();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
        });
      });
  };

  const onSubmitError = (error) => {
    Object.values(error).forEach((item, index) => {
      if (index === 0) {
        toast.error(item.message, {
          position: "top-center",
        });
      }
    });
  };

  const handleFeedback = (e) => {
    e.preventDefault();

    if (user_id) {
      handleSubmit(onSubmitData, onSubmitError)();
    } else {
      navigate("/login");
    }
  };

  const getProducts = async () => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    setProductData(response.data.result[0]);
  };

  const getFeedback = async () => {
    const response = await axios.get(`${API_URL}/feedback/${id}`);
    setFeedbackData(response.data.result);
  };

  useEffect(() => {
    getProducts();
    getFeedback();
  }, [id]);

  return (
    <Layout>
      <div className="md:flex space-y-5 md:space-y-0 px-4 md:px-0 my-10 md:my-16">
        <div className="w-full md:w-6/12">
          <img
            src={productData.product_img}
            alt=""
            className="w-full md:h-80 h-60 object-contain"
          />
        </div>
        <div className="w-full md:w-6/12">
          <h4 className="text-2xl font-medium mb-2">
            {productData.product_name}
          </h4>
          <h5 className="text-xl font-medium text-[#F7931E]">
            ₹{productData.product_price}
          </h5>
          <p className="my-5">Category: {productData.category} </p>

          <div className="flex flex-wrap items-start gap-3">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <button
                onClick={decrement}
                className="text-xl font-semibold px-3 focus:outline-none"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={increment}
                className="text-xl font-semibold px-3 focus:outline-none"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="flex items-center bg-[#F7931E] text-white px-6 py-3.5 rounded-full hover:bg-[#f7921ee6] focus:outline-none"
            >
              Add To Cart
            </Button>
            <Button
              variant="outlined"
              onClick={handleBuyNow}
              className="flex items-center border-2 border-[#F7931E]  text-[#F7931E] px-6 py-3.5 rounded-full hover:bg-[#f7921ee6] hover:text-white focus:outline-none focus:ring-0"
            >
              Buy Now
            </Button>
          </div>
          <hr className="my-8 border-[1.3px]" />

          <div className="space-y-2">
            <div>
              <CheckOutlinedIcon className="text-[#F7931E] mr-2" /> Free
              delivery today
            </div>
            <div>
              <CheckOutlinedIcon className="text-[#F7931E] mr-2" />
              100% money back Guarantee
            </div>
            <div>
              <CheckOutlinedIcon className="text-[#F7931E] mr-2" />7 days
              product return policy
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="">
          <Tabs value={activeTab} className="border-b-2 border-gray-200">
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 bg-blue-gray-50"
              indicatorProps={{
                className:
                  "bg-transparent border-b-2 border-[#F7931E] shadow-none rounded-none",
              }}
            >
              <Tab
                value="description"
                onClick={() => setActiveTab("description")}
                className={
                  activeTab === "description"
                    ? "text-gray-900 py-3 px-3"
                    : "py-3 px-3"
                }
              >
                Descriptions
              </Tab>
              <Tab
                value="review"
                onClick={() => setActiveTab("review")}
                className={
                  activeTab === "review"
                    ? "text-gray-900 py-3 px-3"
                    : "py-3 px-3"
                }
              >
                Reviews ({feedbackData?.length || 0})
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="description">
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="font-normal"
                >
                  {productData.product_desc}
                </Typography>

                <Card className="h-full w-full my-10 overflow-auto">
                  <table className="w-full min-w-max table-auto text-left">
                    <tbody>
                      <tr>
                        <td className="p-4 border-y border-blue-gray-100 bg-blue-gray-50">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            Product Name
                          </Typography>
                        </td>
                        <td className="p-4 border-y border-blue-gray-100">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {productData.product_name}
                          </Typography>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            Product Price
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {productData.product_price}
                          </Typography>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            Product Color
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {productData.product_color}
                          </Typography>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-semiboldsemibold"
                          >
                            Product Size
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {productData.product_size}
                          </Typography>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            Product Storage
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {productData.product_storage}
                          </Typography>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            Product Brand
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {productData.product_brand}
                          </Typography>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-semibold break-words break-all"
                          >
                            Product Special Features
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100 ">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-normal break-words break-all"
                          >
                            {productData.product_special_features}
                          </Typography>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            Product Weight
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {productData.product_weight}
                          </Typography>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            Product Height
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {productData.product_height}
                          </Typography>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            Product Warranty
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {productData.product_warranty}
                          </Typography>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            Product Guarantee
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {productData.product_guarantee}
                          </Typography>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            Product Info
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {productData.product_info}
                          </Typography>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </TabPanel>
              <TabPanel value="review">
                <h4 className="text-xl font-semibold text-black">
                  Customer Reviews
                </h4>

                {feedbackData.length > 0 ? (
                  feedbackData.map((item) => {
                    return (
                      <div
                        className="flex space-x-4 my-5"
                        key={item.feedback_id}
                      >
                        <Avatar src="" alt="user image" size="sm" />
                        <div className="border px-2 py-1 w-full rounded-md">
                          <h5 className="text-lg font-medium text-black">
                            {item.user_name}
                          </h5>
                          <p className="text-gray-600 mt-2">{item.feedback}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <p className="text-sm mt-3">There are no reviews yet.</p>
                    <p className="mt-3 mb-5">
                      Be the first to review “{productData.product_name}”
                    </p>
                  </div>
                )}

                <form>
                  <div>
                    <Controller
                      name="feedback"
                      control={control}
                      rules={{ required: "Review is required" }}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          size="lg"
                          placeholder="Write your review"
                          className={borderForField(errors.feedback)}
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          error={errors.feedback}
                        />
                      )}
                    />
                  </div>
                  <Button
                    variant="filled"
                    className="mt-6 bg-[#F7931E]"
                    type="submit"
                    onClick={handleFeedback}
                  >
                    Submit
                  </Button>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
