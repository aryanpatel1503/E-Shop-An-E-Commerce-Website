import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Product from "../pages/product";
import Contact from "../pages/contact";
import About from "../pages/about";

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
]);
