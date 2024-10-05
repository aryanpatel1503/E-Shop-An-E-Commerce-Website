import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="container mx-auto">
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
