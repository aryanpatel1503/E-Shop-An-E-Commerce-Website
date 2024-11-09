import React, { useEffect, useState } from "react";
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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../lib/constant";
import {
  Avatar,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Header = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems: list } = useSelector((state) => state.cart);
  const user_id = localStorage.getItem("user_id");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const navLinkStyle = ({ isActive, isPending, isTransitioning }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isPending ? "red" : "black",
      viewTransitionName: isTransitioning ? "slide" : "",
    };
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCatgeoryClick = (item) => {
    navigate(`/products/${item.category}`);
    handleClose();
  };

  const getCategory = async () => {
    const response = await axios.get(`${API_URL}/category`);
    setCategoryData(response.data.result);
  };

  const getProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    setProductData(response.data.result);
  };

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const filterData = productData.filter((item) =>
      item.product_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filterData);
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center">
        <NavLink
          to="/"
          className="text-3xl flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          E-Shop
        </NavLink>

        <div className="relative flex md:mx-auto w-full max-w-[24rem]">
          <Input
            type="search"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search for products"
            labelProps={{
              className: "hidden",
            }}
            className="pr-20 !border !border-blue-gray-200 bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 "
          />
          <Menu placement="bottom-end">
            <MenuHandler>
              <Button
                size="sm"
                color={"blue-gray"}
                className="!absolute right-1 top-[1.8px] rounded"
              >
                <SearchOutlinedIcon fontSize="small" />
              </Button>
            </MenuHandler>
            <MenuList>
              {filteredData?.length > 0 ? (
                filteredData?.map((item, index) => {
                  return (
                    <MenuItem
                      className="flex items-center gap-2"
                      key={index}
                      onClick={() => navigate(`/product/${item.product_id}`)}
                    >
                      {item.product_name}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem className="flex items-center">
                  No Records found
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </div>

        <div className="flex space-x-4">
          {user_id ? (
            <>
              <Menu>
                <MenuHandler>
                  <div className="relative flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 shadow-md cursor-pointer">
                    <PersonOutlineIcon className="" sx={{ color: "#22262A" }} />
                  </div>
                </MenuHandler>
                <MenuList>
                  <MenuItem
                    className="flex items-center gap-2"
                    onClick={() => navigate("/profile")}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10 5C10 5.53043 9.78929 6.03914 9.41421 6.41421C9.03914 6.78929 8.53043 7 8 7C7.46957 7 6.96086 6.78929 6.58579 6.41421C6.21071 6.03914 6 5.53043 6 5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5ZM8 9C7.0426 8.99981 6.10528 9.27449 5.29942 9.7914C4.49356 10.3083 3.85304 11.0457 3.454 11.916C4.01668 12.5706 4.71427 13.0958 5.49894 13.4555C6.28362 13.8152 7.13681 14.0009 8 14C8.86319 14.0009 9.71638 13.8152 10.5011 13.4555C11.2857 13.0958 11.9833 12.5706 12.546 11.916C12.147 11.0457 11.5064 10.3083 10.7006 9.7914C9.89472 9.27449 8.9574 8.99981 8 9Z"
                        fill="#90A4AE"
                      />
                    </svg>

                    <Typography variant="small" className="font-medium">
                      My Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    className="flex items-center gap-2"
                    onClick={() => navigate("/order")}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V12C0 12.5304 0.210714 13.0391 0.585786 13.4142C0.960859 13.7893 1.46957 14 2 14H12C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0H2ZM2 2H12V9H10L9 11H5L4 9H2V2Z"
                        fill="#90A4AE"
                      />
                    </svg>

                    <Typography variant="small" className="font-medium">
                      Orders
                    </Typography>
                  </MenuItem>
                  <hr className="my-2 border-blue-gray-50" />
                  <MenuItem
                    className="flex items-center gap-2 "
                    onClick={handleLogout}
                  >
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                        fill="#90A4AE"
                      />
                    </svg>
                    <Typography variant="small" className="font-medium">
                      Logout
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                className="flex items-center gap-1 text-[#F7931E] border border-[#F7931E] hover:bg-[#F7931E] hover:text-white hover:border-none"
                onClick={() => navigate("/login")}
              >
                Log In
              </Button>
              <Button
                className="flex items-center gap-1 bg-[#F7931E]"
                onClick={() => navigate("/signup")}
              >
                Register
              </Button>
            </>
          )}

          <div
            className="relative flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 shadow-md cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingBagOutlinedIcon
              className=""
              fontSize="medium"
              sx={{ color: "#22262A" }}
            />
            <div className="absolute top-[-10px] right-[-10px] flex items-center justify-center h-6 w-6 rounded-full bg-[#F7931E] text-white text-sm">
              {list.length || 0}
            </div>
          </div>
        </div>
      </div>

      <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-lg justify-center">
        <NavLink
          to="/"
          style={navLinkStyle}
          className="mr-5 hover:text-gray-900"
        >
          Home
        </NavLink>
        <NavLink
          to=""
          // style={navLinkStyle}
          style={{
            color: "black",
          }}
          className="mr-5 hover:text-gray-900"
          onClick={handleClick}
        >
          Product
          {open ? (
            <ExpandLessIcon className="ml-2" />
          ) : (
            <ExpandMoreIcon className="ml-2" />
          )}
        </NavLink>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <List component="div" disablePadding style={{ width: "150px" }} dense>
            {categoryData?.map((item, index) => {
              return (
                <ListItemButton
                  onClick={() => handleCatgeoryClick(item)}
                  selected={location.pathname === `/products/${item.category}`}
                  key={index}
                >
                  <ListItemText primary={item.category} />
                </ListItemButton>
              );
            })}
          </List>
        </Popover>

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
