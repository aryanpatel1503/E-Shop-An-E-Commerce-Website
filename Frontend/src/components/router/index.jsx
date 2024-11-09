import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "../app/PrivateRoute";
const Home = lazy(() => import("../pages/home"));
const Product = lazy(() => import("../pages/product"));
const Contact = lazy(() => import("../pages/contact"));
const About = lazy(() => import("../pages/about"));
const ProductDetail = lazy(() => import("../pages/productDetail"));
const Cart = lazy(() => import("../pages/cart"));
const Checkout = lazy(() => import("../pages/checkout"));
const Login = lazy(() => import("../pages/login"));
const SignUp = lazy(() => import("../pages/signUp"));
const ResetPassword = lazy(() => import("../pages/resetPassword"));
const Profile = lazy(() => import("../pages/profile"));
const Order = lazy(() => import("../pages/order"));
const ViewCustomer = lazy(() => import("../admin/customer"));
const AddUpdateCustomer = lazy(() =>
  import("../admin/customer/AddUpdateCustomer")
);
const ViewProduct = lazy(() => import("../admin/product"));
const AddUpdateProduct = lazy(() =>
  import("../admin/product/AddUpdateProduct")
);
const ViewCategory = lazy(() => import("../admin/category"));
const AddUpdateCategory = lazy(() =>
  import("../admin/category/AddUpdateCategory")
);
const ViewOrder = lazy(() => import("../admin/order"));
const AddUpdateOrder = lazy(() => import("../admin/order/AddUpdateOrder"));
const ViewFeedback = lazy(() => import("../admin/feedback"));
const Report = lazy(() => import("../admin/report"));
const Dashboard = lazy(() => import("../admin/dashboard"));
const AdminLogin = lazy(() => import("../admin/adminLogin"));

const Router = () => {
  const [path, setPath] = useState("/");
  const [login, setLogin] = useState(false);
  const islogin = localStorage.getItem("adminData");

  useEffect(() => {
    setPath(window.location.pathname);
  });

  return (
    <>
      {path.includes("admin") ? (
        <>
          <Routes>
            <Route element={<PrivateRoute islogin={login || islogin} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/viewuser" element={<ViewCustomer />} />
              <Route path="/admin/adduser" element={<AddUpdateCustomer />} />
              <Route
                path="/admin/edituser/:name"
                element={<AddUpdateCustomer />}
              />
              <Route path="/admin/viewproduct" element={<ViewProduct />} />
              <Route path="/admin/addproduct" element={<AddUpdateProduct />} />
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
            </Route>
            <Route path="/admin" element={<AdminLogin setLogin={setLogin} />} />
          </Routes>
          <ToastContainer />
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:name" element={<Product />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default Router;
