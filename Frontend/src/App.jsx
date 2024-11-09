import React, { Suspense } from "react";
import Header from "./components/app/Header";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import Router from "./components/router";
import { CircularProgress } from "@mui/material";
import LoadingComponent from "./components/app/LoadingComponent";
import BackdropComponent from "./components/app/BackdropComponent";
// import { router } from "./components/router";

const App = () => {
  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <Suspense fallback={<LoadingComponent />}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <BackdropComponent />
      </Suspense>
    </>
  );
};

export default App;
