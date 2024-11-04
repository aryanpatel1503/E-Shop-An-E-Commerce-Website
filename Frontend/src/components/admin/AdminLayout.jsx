import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Navbar />
      <div className="w-2/12">
        <Sidebar />
      </div>

      <div className="w-10/12 mt-16">{children}</div>
    </div>
  );
};

export default AdminLayout;
