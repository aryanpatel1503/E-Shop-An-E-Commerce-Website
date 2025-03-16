import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { AddCircleOutlineRounded, ArrowBackRounded } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { isblank } from "../lib/commonFunctions";

const AdminLayout = ({
  children,
  title = "",
  actionName = "",
  actionPath = "",
}) => {
  return (
    <div className="flex">
      <Navbar />
      <div className="hidden md:block md:w-3/12 lg:w-2/12">
        <Sidebar />
      </div>

      <div className="w-full md:w-9/12 lg:w-10/12 mt-[87px] xs:mt-16">
        <div
          className={`flex flex-col xs:flex-row justify-center xs:justify-between items-center gap-1 px-4 bg-blue-100 ${
            isblank(actionPath) && isblank(actionName) ? "py-6" : "py-3 xs:py-4"
          } ${actionName === "Back" ? "mb-2" : ""}`}
        >
          <h3 className="text-2xl font-medium font-serif text-blue-500">
            {title}
          </h3>
          {!isblank(actionPath) && !isblank(actionName) && (
            <NavLink
              to={actionPath}
              className="px-2 py-2 md:px-4 md:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {actionName === "Back" ? (
                <ArrowBackRounded className="mr-1" />
              ) : (
                <AddCircleOutlineRounded className="mr-1" />
              )}

              {actionName}
            </NavLink>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
