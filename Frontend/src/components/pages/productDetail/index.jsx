import React, { useState } from "react";
import Layout from "../../app/Layout";
import {
  Avatar,
  Button,
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

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const defaultValues = {
    feedback: "",
  };
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  // Increment quantity
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  // Decrement quantity (ensure it stays above 1)
  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Handle Add to Cart (you can customize this)
  const handleAddToCart = () => {
    console.log(`Added ${quantity} item(s) to cart`);
  };

  const onSubmitData = (values) => {
    console.log(values);
  };

  const onSubmitError = (error) => {
    Object.values(error).forEach((item, index) => {
      if (index === 0) {
        toast.error(item.message, {
          position: "top-right",
        });
        console.log("item", item.message);
      }
    });
  };

  const handleFeedback = (e) => {
    e.preventDefault();
    handleSubmit(onSubmitData, onSubmitError)();
  };

  return (
    <Layout>
      <div className="flex my-16">
        <div className="w-6/12"></div>
        <div className="w-6/12">
          <h4 className="text-2xl font-medium mb-2">
            14 Pro Max 5G Unlocked Smartphone – 6GB+256GB
          </h4>
          <h5 className="text-xl font-medium text-[#F7931E]">40000₹</h5>
          <p className="my-5">Category: SmartPhone </p>

          <div className="flex items-center space-x-4">
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
              onClick={handleAddToCart}
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
                Reviews (0)
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="description">
                It really matters and then like it really doesn't matter. What
                matters is the people who are sparked by it. And the people who
                are like offended by it, it doesn't matter.
              </TabPanel>
              <TabPanel value="review">
                <h4 className="text-xl font-semibold text-black">
                  Customer Reviews
                </h4>

                <div className="flex space-x-4 my-5">
                  <Avatar src={profileImage} alt="avatar" size="sm" />
                  <div className="border px-2 py-1 w-full rounded-md">
                    <h5 className="text-lg font-medium text-black">Aryan</h5>
                    <p className="text-gray-600 mt-2">
                      This is better product.
                    </p>
                  </div>
                </div>

                <p className="text-sm mt-3">There are no reviews yet.</p>
                <p className="mt-3 mb-5">
                  Be the first to review “14 Pro Max 5G Unlocked Smartphone –
                  6GB+256GB”
                </p>

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
