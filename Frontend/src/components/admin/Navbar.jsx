import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Article, ChatBubble } from "@mui/icons-material";

const Navbar = () => {
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const handleToggleSidebar = () => {
    setOpen(true);
  };

  const menuData = () => {
    return [
      {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: (
          <svg
            aria-hidden="true"
            className="w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-blue-100 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
        ),
      },
      {
        name: "Customers",
        path: "/admin/viewuser",
        mathPath: "customer",
        icon: (
          <svg
            aria-hidden="true"
            className="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        ),
      },
      {
        name: "Products",
        path: "/admin/viewproduct",
        mathPath: "product",
        icon: (
          <svg
            aria-hidden="true"
            className="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
              clipRule="evenodd"
            ></path>
          </svg>
        ),
      },
      {
        name: "Category",
        path: "/admin/viewcategory",
        mathPath: "category",
        icon: (
          <svg
            aria-hidden="true"
            className="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-blue-100 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
        ),
      },
      {
        name: "Order",
        path: "/admin/vieworder",
        mathPath: "order",
        icon: (
          <svg
            aria-hidden="true"
            className="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
            <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
          </svg>
        ),
      },
      {
        name: "Feedback",
        path: "/admin/viewfeedback",
        icon: <ChatBubble />,
      },
      {
        name: "Report",
        path: "/admin/report",
        icon: <Article />,
      },
      {
        name: "Logout",
        path: "/admin",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        ),
      },
    ];
  };

  const handleMenuClick = (path) => {
    if (path === "/admin") {
      localStorage.removeItem("adminData");
    }
    navigate(path);
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 xs:h-16">
      <div className="flex flex-col xs:flex-row items-center justify-between h-full lg:px-5 lg:pl-3 py-1 xs:py-0">
        <div className="flex">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={handleToggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <NavLink href="/admin/dashboard" className="flex ml-2 md:mr-24">
            {/* <img
              src="/"
              className="h-8 mr-3"
              alt="Logo"
            /> */}
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              SmartTechStore
            </span>
          </NavLink>
        </div>
        <div className="flex items-center ml-3 space-x-3">
          <Typography variant="h6"> {adminData?.admin_name} </Typography>
          <Avatar src="" alt="avatar" size="xs" />
        </div>
      </div>

      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          // onClick={() => toggleDrawer(false)}
        >
          <div className="my-4 flex items-center justify-between px-4">
            <Typography
              variant="h6"
              color="blue-gray"
              sx={{ fontWeight: 600 }}
              className="font-extrabold"
            >
              SmartTechStore
            </Typography>
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={() => toggleDrawer(false)}
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <Divider />
          <List>
            {menuData().map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => handleMenuClick(item.path)}
                  selected={
                    item.path === pathname ||
                    `/admin/add${item.mathPath}` === pathname ||
                    pathname.startsWith(`/admin/edit${item.mathPath}`)
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{ variant: "button" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
