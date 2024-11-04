import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ path, element: Element, islogin, ...props }) => {
  return islogin ? <Outlet /> : <Navigate to="/admin" />;
};
