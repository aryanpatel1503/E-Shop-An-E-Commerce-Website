import React, { Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LoadingComponent from "./LoadingComponent";

const Layout = ({ children }) => {
  return (
    <>
      <div className="container mx-auto">
        <Header />
        <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
