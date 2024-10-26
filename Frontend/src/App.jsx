import React from "react";
import Header from "./components/app/Header";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import Router from "./components/router";
// import { router } from "./components/router";

const App = () => {
  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <Router />
    </>
  );
};

export default App;
