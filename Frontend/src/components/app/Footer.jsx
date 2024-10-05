import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-white py-8">
      <div className="flex container mx-auto">
        <div className="">
          <h5 className="text-xl">E-Shop</h5>

          <div className="flex justify-between my-6 w-96">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/product">Product</NavLink>
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
