import React from "react";
import Layout from "../../app/Layout";
import image from "../../../assets/about_us_img.jpg";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const About = () => {
  const aboutUsData = [
    {
      title: "Who We Are",
      subtitle: "We are Provide ecommerce services.",
    },
    {
      title: "What We Do",
      subtitle: "We are Provide Products like laptop, tablet, etc.",
    },
    {
      title: "How We Do It",
      subtitle: "We are provide best ecommerce services to the user.",
    },
  ];
  return (
    <Layout>
      <div className=" flex flex-col justify-center items-center text-black h-64">
        <h2 className="text-5xl font-medium mb-4">About Us</h2>
        <p className="text-xl">We care for the User and we love it</p>
      </div>

      <div className="flex">
        {aboutUsData.map((item) => {
          return (
            <Card className="mt-6 w-4/12 shadow-none">
              <CardBody className="text-center">
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="mb-4 font-medium"
                >
                  {item.title}
                </Typography>
                <Typography>{item.subtitle}</Typography>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <div className="text-center my-16">
        <h4 className="text-5xl mb-4">E-Shop</h4>
        <p className="text-xl text-gray-700">
          At E-Shop, We are provide best ecommerce services to the user.
        </p>
      </div>
    </Layout>
  );
};

export default About;
