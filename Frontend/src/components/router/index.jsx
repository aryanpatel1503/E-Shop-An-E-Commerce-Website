import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Product from "../pages/product";
import Contact from "../pages/contact";
import About from "../pages/about";
import ProductDetail from "../pages/productDetail";
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";
import Login from "../pages/login";
import SignUp from "../pages/signUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
