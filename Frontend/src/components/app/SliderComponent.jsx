import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = ({ data, Component }) => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data.map((item, index) => {
          return (
            <div key={index}>
              <Component item={item} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderComponent;
