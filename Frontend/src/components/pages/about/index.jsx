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
import aboutImg from "../../../assets/about_us_img.jpg";

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
      <div
        className="flex flex-col justify-center lg:items-end items-center lg:pr-10 text-white h-64 my-12 rounded-md"
        style={{
          backgroundImage: `url(${aboutImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-5xl font-medium mb-4 text-left">About Us</h2>
        <p className="text-xl">We care for the User and we love it</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-2 lg:mx-0">
        {aboutUsData.map((item, index) => {
          return (
            <Card key={index} className="lg:mt-6 shadow-allSide" shadow={false}>
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
        <h4 className="text-5xl mb-4">SmartTechStore</h4>
        <p className="text-xl text-gray-700">
          At SmartTechStore, We are provide best ecommerce services to the user.
        </p>
      </div>
    </Layout>
  );
};

export default About;
