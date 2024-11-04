import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ArticleIcon from "@mui/icons-material/Article";

const Sidebar = () => {
  const navigate = useNavigate();
  const active = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#dbeafe" : "",
      color: isActive ? "#3b82f6" : "",
      borderRight: isActive ? "3px solid #3b82f6 " : "",
    };
  };

  const handleLogout = () => {
    localStorage.removeItem("adminData");
  };

  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 uppercase h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 w-2/12"
        aria-label="Sidebar"
      >
        <div className="h-full pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-1 font-medium h-full flex flex-col">
            <li>
              <NavLink
                to="/admin/dashboard"
                style={active}
                className="flex items-center pl-5 py-3 text-gray-900 hover:border-r-[3px] hover:border-blue-500 hover:text-blue-500 hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700"
              >
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
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/viewuser"
                style={active}
                className="flex items-center pl-5 py-3 text-gray-900 hover:border-r-[3px] hover:border-blue-500 hover:text-blue-500 hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700"
              >
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
                <span className="flex-1 ml-3 whitespace-nowrap">Customers</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/viewproduct"
                style={active}
                className="flex items-center pl-5 py-3 text-gray-900 hover:border-r-[3px] hover:border-blue-500 hover:text-blue-500 hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700"
              >
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
                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/viewcategory"
                style={active}
                className="flex items-center pl-5 py-3 text-gray-900 hover:border-r-[3px] hover:border-blue-500 hover:text-blue-500 hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-blue-100 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Category</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/vieworder"
                style={active}
                className="flex items-center pl-5 py-3 text-gray-900 hover:border-r-[3px] hover:border-blue-500 hover:text-blue-500 hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700"
              >
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
                <span className="flex-1 ml-3 whitespace-nowrap">Order</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/viewfeedback"
                style={active}
                className="flex items-center pl-5 py-3 text-gray-900 hover:border-r-[3px] hover:border-blue-500 hover:text-blue-500 hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700"
              >
                <ChatBubbleIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">Feedback</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/report"
                style={active}
                className="flex items-center pl-5 py-3 text-gray-900 hover:border-r-[3px] hover:border-blue-500 hover:text-blue-500 hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700"
              >
                <ArticleIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">Report</span>
              </NavLink>
            </li>

            <div style={{ flexGrow: 1 }} />
            <li>
              <NavLink
                to="/admin"
                className="flex items-center pl-5 py-3 text-gray-900 hover:border-r-[3px] hover:border-blue-500 hover:text-blue-500 hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700 w-full "
                onClick={handleLogout}
              >
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

                <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
