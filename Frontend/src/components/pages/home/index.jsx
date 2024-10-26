import React, { useEffect, useState } from "react";
import Layout from "../../app/Layout";
import {
  Button,
  Card,
  Carousel,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import SliderComponent from "../../app/SliderComponent";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AttributionIcon from "@mui/icons-material/Attribution";
import ProductCard from "../../app/ProductCard";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../../lib/constant";

const Home = () => {
  const naviagate = useNavigate();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const heroData = [
    {
      title: "Spark Your Saving on Electronics",
      subtitle:
        "New Electronics Deals Added! Explore the latest discounts on Laptop, Keyboard and Smart Phone.",
      imgUrl:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    },
    {
      title: "Spark Your Saving on Electronics",
      subtitle:
        "New Electronics Deals Added! Explore the latest discounts on Laptop, Keyboard and Smart Phone.",
      imgUrl:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
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
      <Card className="mt-6 w-96 shadow-none" style={{ margin: "0 10px" }}>
        <CardHeader
          color="transparent"
          className="rounded-full text-center shadow-none"
          floated={false}
        >
          <Avatar
            size="xxl"
            variant="circular"
            alt="tania andrew"
            className="mx-auto"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
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

  const RecommendComponent = ({ item }) => {
    return (
      <Card className="w-full max-w-[26rem] shadow-lg">
        <CardHeader floated={false} color="blue-gray">
          <img
            src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="ui/ux review check"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        </CardHeader>
        <CardBody>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              {item.title}
            </Typography>
          </div>
          <Typography className="text-xl text-black font-medium">
            {item.price}
          </Typography>
        </CardBody>
        <CardFooter className="pt-2 flex justify-between">
          <Button size="md" className="bg-[#F7931E]">
            Buy Now
          </Button>
          <Button
            variant="outlined"
            size="md"
            className="text-[#F7931E] border-[#F7931E]"
            onClick={() => {
              addItem(item);
            }}
          >
            Add To Cart
          </Button>
        </CardFooter>
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
        autoplay={false}
        loop={true}
        className="rounded-xl mt-10"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {heroData.map((item, index) => {
          return (
            <div className="grid grid-cols-2 gap-4 h-[90vh]" key={index}>
              <div className="flex justify-center flex-col">
                <p className="text-5xl font-medium leading-tight">
                  {item.title}
                </p>
                <p className="text-xl my-5">{item.subtitle}</p>
                <h3 className="text-3xl"></h3>

                <Button
                  variant="text"
                  className="flex items-center gap-2 self-start bg-[#F7931E] text-white"
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
                className="h-full w-full object-cover"
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

        <SliderComponent data={productData} Component={ProductCard} />
      </div>

      <div className="my-20 flex">
        {infoData.map((item, index) => {
          return (
            <div className="flex w-4/12" key={index}>
              <div className="w-3/12">{item.icon}</div>
              <div className="w-9/12">
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
