import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Button,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
  Tooltip,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [value, setValue] = React.useState("all");

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

        <div className="relative flex md:ml-auto md:mr-auto">
          <div className=" flex w-full max-w-[26rem] border border-blue-gray-200 rounded-md">
            <Select
              variant="outlined"
              label=""
              value={value}
              onChange={(val) => setValue(val)}
              className="border-none"
              labelProps={{
                className: "hidden",
              }}
            >
              <Option value="all">All Categories</Option>
              <Option value="laptop">Laptop</Option>
              <Option value="mobile">Mobile</Option>
            </Select>

            <Input
              type="text"
              placeholder="Search for products"
              className="!border !border-blue-gray-200 border-none bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 "
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <Button className="flex items-center gap-1 bg-[#5093f7] py-1">
            <SearchOutlinedIcon fontSize="small" />
            Search
          </Button>
        </div>

        <div className="">
          <IconButton className="rounded-full bg-[#f7f7f7] hover:bg-[#5093f7] hover:text-white">
            <PersonOutlineIcon
              className="hover:text-white"
              sx={{ color: "#22262A" }}
            />
          </IconButton>
          <IconButton className="rounded-full bg-[#f7f7f7] hover:bg-[#5093f7] hover:text-white mx-3">
            <ShoppingBagOutlinedIcon
              className="hover:text-white"
              sx={{ color: "#22262A" }}
            />
          </IconButton>
        </div>
      </div>
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
    </header>
  );
};

export default Header;
