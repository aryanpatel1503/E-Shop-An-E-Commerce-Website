import React from "react";
import Header from "./components/app/Header";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/router";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />

      {/* <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">E-Commerce Website</h1>
      </div> */}
    </>
  );
};

export default App;
