import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Tooltip } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navLinkStyle = ({ isActive, isPending, isTransitioning }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isPending ? "red" : "black",
      viewTransitionName: isTransitioning ? "slide" : "",
    };
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center">
        <NavLink
          to="/"
          className="text-xl flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          E-Shop
        </NavLink>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <NavLink
            to="/"
            style={navLinkStyle}
            className="mr-5 hover:text-gray-900"
          >
            Home
          </NavLink>
          <NavLink
            to="/product"
            style={navLinkStyle}
            className="mr-5 hover:text-gray-900"
          >
            Product
          </NavLink>
          <NavLink
            to="/contact"
            style={navLinkStyle}
            className="mr-5 hover:text-gray-900"
          >
            Contact
          </NavLink>
          <NavLink
            to="/about"
            style={navLinkStyle}
            className="mr-5 hover:text-gray-900"
          >
            About
          </NavLink>
        </nav>

        <Tooltip content="Log in">
          <button className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0">
            <PersonOutlineIcon />
          </button>
        </Tooltip>
        <Tooltip content="Search">
          <button className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0">
            <SearchOutlinedIcon />
          </button>
        </Tooltip>
        <Tooltip content="Cart">
          <button className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0">
            <ShoppingBagOutlinedIcon />
          </button>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
