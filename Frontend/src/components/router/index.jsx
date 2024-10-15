import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from "../pages/home";
import Product from "../pages/product";
import Contact from "../pages/contact";
import About from "../pages/about";
import ProductDetail from "../pages/productDetail";
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";
import Login from "../pages/login";
import SignUp from "../pages/signUp";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Sidebar from "../admin/Sidebar";
import ViewCustomer from "../admin/customer";
import AddUpdateCustomer from "../admin/customer/AddUpdateCustomer";
import ViewProduct from "../admin/product";
import AddUpdateProduct from "../admin/product/AddUpdateProduct";
import ViewCategory from "../admin/category";
import AddUpdateCategory from "../admin/category/AddUpdateCategory";
import ViewOrder from "../admin/order";
import AddUpdateOrder from "../admin/order/AddUpdateOrder";
import ViewFeedback from "../admin/feedback";
import Report from "../admin/report";
import Dashboard from "../admin/dashboard";

const Router = () => {
  const [path, setPath] = useState("/");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setPath(window.location.pathname);
  });
  return (
    <>
      {path.includes("admin") ? (
        <>
          <BrowserRouter>
            {/* {login ? ( */}
            <>
              <Sidebar setLogin={setLogin} />
              <Routes>
                {/* <Route path="/admin" element={<AdminLogin />} /> */}
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/viewuser" element={<ViewCustomer />} />
                <Route path="/admin/adduser" element={<AddUpdateCustomer />} />
                <Route
                  path="/admin/edituser/:name"
                  element={<AddUpdateCustomer />}
                />
                <Route path="/admin/viewproduct" element={<ViewProduct />} />
                <Route
                  path="/admin/addproduct"
                  element={<AddUpdateProduct />}
                />
                <Route
                  path="/admin/editproduct/:name"
                  element={<AddUpdateProduct />}
                />
                <Route path="/admin/viewcategory" element={<ViewCategory />} />
                <Route
                  path="/admin/addcategory"
                  element={<AddUpdateCategory />}
                />
                <Route
                  path="/admin/editcategory/:name"
                  element={<AddUpdateCategory />}
                />
                <Route path="/admin/vieworder" element={<ViewOrder />} />
                <Route path="/admin/addorder" element={<AddUpdateOrder />} />
                <Route
                  path="/admin/editorder/:name"
                  element={<AddUpdateOrder />}
                />
                <Route path="/admin/viewfeedback" element={<ViewFeedback />} />
                <Route path="/admin/report" element={<Report />} />
              </Routes>
            </>
            {/* ) : ( */}
            <>{/* <AdminLogin setLogin={setLogin} /> */}</>
            {/* )} */}
          </BrowserRouter>
        </>
      ) : (
        <>
          <BrowserRouter>
            {/* <Navbar /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Product />} />
              <Route path="/about" element={<About />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="*" element={<Home />} />
            </Routes>
            {/* <Footer /> */}
            <ToastContainer />
          </BrowserRouter>
        </>
      )}
    </>
  );
};

export default Router;
