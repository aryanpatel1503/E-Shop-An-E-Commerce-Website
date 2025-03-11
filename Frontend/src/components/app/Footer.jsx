import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-white py-8 px-2 sm:px-0">
      <div className="flex container mx-auto">
        <div className="">
          <h5 className="text-xl">SmartTechStore</h5>

          <div className="my-6 space-x-9">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products/laptop">Product</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
        </div>
      </div>
      <h5 className="text-center">
        Copyright &copy; 2024 All rights reserved!
      </h5>
    </div>
  );
};

export default Footer;
