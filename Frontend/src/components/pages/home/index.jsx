import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Carousel,
  Typography,
} from "@material-tailwind/react";
import AttributionIcon from "@mui/icons-material/Attribution";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../app/Layout";
import ProductCard from "../../app/ProductCard";
import SliderComponent from "../../app/SliderComponent";
import { API_URL } from "../../lib/constant";
import heroImg1 from "../../../assets/heroImg1.png";
import heroImg2 from "../../../assets/heroImg2.png";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Home = () => {
  const naviagate = useNavigate();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const heroData = [
    {
      title: "Spark Your Saving on Electronics",
      subtitle:
        "New Electronics Deals Added! Explore the latest discounts on Laptop, Keyboard and Smart Phone.",
      imgUrl: heroImg1,
    },
    {
      title: "Spark Your Saving on Electronics",
      subtitle:
        "New Electronics Deals Added! Explore the latest discounts on Laptop, Keyboard and Smart Phone.",
      imgUrl: heroImg2,
    },
  ];

  const infoData = [
    {
      icon: (
        <LocalShippingOutlinedIcon
          style={{ fontSize: "60px", color: "#F7931E" }}
        />
      ),
      title: "Free Shipping",
      subtitle: "We are providing free shipping all over state.",
    },
    {
      icon: <AttributionIcon style={{ fontSize: "60px", color: "#F7931E" }} />,
      title: "24/7 Support",
      subtitle: "We are providing 24/7 Support.",
    },
    {
      icon: <SupportAgentIcon style={{ fontSize: "60px", color: "#F7931E" }} />,
      title: "Customer Support",
      subtitle: "We are providing Customer Support.",
    },
  ];

  const TrendingCollectionComponent = ({ item }) => {
    return (
      <Card className="mt-6 shadow-none">
        <CardHeader
          color="transparent"
          className="rounded-full text-center shadow-none"
          floated={false}
        >
          <Avatar
            size="xxl"
            variant="circular"
            alt={item.category}
            className="mx-auto object-contain rounded-full shadow-allSide p-2"
            src={item.category_img}
          />
        </CardHeader>
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-center"
          >
            {item.category}
          </Typography>
        </CardBody>
      </Card>
    );
  };

  const getProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    setProductData(response.data.result);
  };

  const getCategory = async () => {
    const response = await axios.get(`${API_URL}/category`);
    setCategoryData(response.data.result);
  };

  useEffect(() => {
    getProducts();
    getCategory();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <Carousel
        autoplay={true}
        autoplayDelay={3000}
        loop={true}
        className="rounded-xl mt-10"
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4"
          >
            <ChevronLeft fontSize="large" />
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4"
          >
            <ChevronRight fontSize="large" />
          </IconButton>
        )}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i
                    ? "w-8 bg-black"
                    : "w-4 bg-blue-gray-300  /50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {heroData.map((item, index) => {
          return (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:h-[90vh] mx-4 md:mx-0 py-10"
              key={index}
            >
              <div className="flex justify-center flex-col order-2 md:order-1">
                <p className="text-3xl md:text-5xl font-medium leading-tight">
                  {item.title}
                </p>
                <p className="text-lg md:text-xl my-5">{item.subtitle}</p>
                <h3 className="text-3xl"></h3>

                <Button
                  variant="text"
                  className="flex items-center gap-2 self-start bg-[#F7931E] text-white hover:bg-[#ff9e2f]"
                  onClick={() => naviagate("/products/laptop")}
                >
                  Shop Now{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </div>
              <img
                src={item.imgUrl}
                alt="image 1"
                className="justify-self-center h-[150px] md:h-full w-[80%] md:w-full object-contain order-1 md:order-2"
              />
            </div>
          );
        })}
      </Carousel>

      <div className="my-20">
        <h3 className="text-3xl font-medium text-center mb-7">
          Trending Collection
        </h3>

        <SliderComponent
          data={categoryData}
          Component={TrendingCollectionComponent}
        />
      </div>

      <div className="my-20">
        <h3 className="text-3xl font-medium text-center mb-7">
          Recommend for you
        </h3>

        <SliderComponent
          data={productData.filter((item, index) => index <= 12)}
          Component={ProductCard}
        />
      </div>

      <div className="my-20 grid gap-6 grid-cols-1 md:grid-cols-3 mx-2 md:mx-0">
        {infoData.map((item, index) => {
          return (
            <div className="flex items-start space-x-4" key={index}>
              <div>{item.icon}</div>
              <div>
                <h4 className="text-2xl"> {item.title} </h4>
                <p className="text-lg text-gray-700 mt-1"> {item.subtitle} </p>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
