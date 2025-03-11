import React, { lazy, useEffect, useMemo, useState } from "react";
import Layout from "../../app/Layout";
const ProductCard = lazy(() => import("../../app/ProductCard"));
import Pagination from "../../app/Pagination";
import { API_URL } from "../../lib/constant";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { Button, Checkbox, Typography } from "@material-tailwind/react";

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [productData, setProductData] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [category, setCategory] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    color: [],
  });
  const [openRight, setOpenRight] = useState(false);
  const navigate = useNavigate();
  const { name } = useParams();
  const brandData = [...new Set(productData.map((item) => item.product_brand))];
  const colorData = [...new Set(productData.map((item) => item.product_color))];

  const closeDrawerRight = () => {
    setOpenRight(false);
  };

  const handleSortingChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleCatgeoryClick = (item) => {
    navigate(`/products/${item.category}`);
  };

  const handleFilterClick = (event, filterType) => {
    const { value, checked } = event.target;

    setSelectedFilters((prev) => {
      const updatedFilter = checked
        ? [...prev[filterType], value]
        : prev[filterType].filter((item) => item !== value);

      return {
        ...prev,
        [filterType]: updatedFilter,
      };
    });
  };

  const applyFiltersAndSorting = useMemo(() => {
    // Step 1: Apply Filtering
    const filtered = productData.filter((item) => {
      const brandMatch =
        selectedFilters.brand.length === 0 ||
        selectedFilters.brand.includes(item.product_brand);

      const colorMatch =
        selectedFilters.color.length === 0 ||
        selectedFilters.color.includes(item.product_color);

      return brandMatch && colorMatch;
    });

    // Step 2: Apply Sorting on Filtered Data
    let sortedFilteredProducts = [...filtered];
    if (sortOption === "priceLowToHigh") {
      sortedFilteredProducts.sort((a, b) => a.product_price - b.product_price);
    } else if (sortOption === "priceHighToLow") {
      sortedFilteredProducts.sort((a, b) => b.product_price - a.product_price);
    } else if (sortOption === "nameAToZ") {
      sortedFilteredProducts.sort((a, b) =>
        a.product_name.localeCompare(b.product_name)
      );
    } else if (sortOption === "nameZToA") {
      sortedFilteredProducts.sort((a, b) =>
        b.product_name.localeCompare(a.product_name)
      );
    }

    // Return filtered and sorted data
    return sortedFilteredProducts;
  }, [productData, selectedFilters, sortOption]);

  // Step 3: Apply Pagination to Filtered and Sorted Data
  const paginatedProducts = useMemo(() => {
    return applyFiltersAndSorting.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [applyFiltersAndSorting, currentPage]);

  const getProducts = async () => {
    const response = await axios.get(`${API_URL}/category/${name}`);
    setProductData(response.data.result);
  };

  const getCategory = async () => {
    const response = await axios.get(`${API_URL}/category`);
    setCategory(response.data.result);
  };

  useEffect(() => {
    getProducts();
    getCategory();
  }, [name]);

  return (
    <Layout>
      <div className="my-10 lg:my-20 flex justify-center lg:gap-x-3">
        <div className="hidden lg:block lg:w-2/12 ">
          <div className="">
            <h5 className="text-2xl">Filters</h5>
          </div>

          <hr className="my-3" />

          <>
            <div>
              <h6 className="text-xl">Categories</h6>
              <List dense>
                {category.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="comments"
                          onClick={() => handleCatgeoryClick(item)}
                        >
                          <ChevronRight />
                        </IconButton>
                      }
                      disablePadding
                    >
                      <ListItemButton onClick={() => handleCatgeoryClick(item)}>
                        <ListItemText primary={item.category} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>

            <hr className="my-3" />

            <div>
              <h6 className="text-xl">Brand</h6>
              <div className="flex flex-col">
                {brandData.map((item, index) => {
                  return (
                    <Checkbox
                      key={index}
                      label={item}
                      value={item}
                      onChange={(e) => handleFilterClick(e, "brand")}
                    />
                  );
                })}
              </div>
            </div>

            <hr className="my-3" />

            <div>
              <h6 className="text-xl">Color</h6>
              <div className="flex flex-col mb-9">
                {colorData.map((item, index) => {
                  return (
                    <Checkbox
                      key={index}
                      label={item}
                      value={item}
                      onChange={(e) => handleFilterClick(e, "color")}
                    />
                  );
                })}
              </div>
            </div>
          </>
        </div>
        <div className="w-12/12 lg:w-10/12">
          <div className="flex justify-end mb-4 space-x-3">
            <Button
              variant="outlined"
              className="outline-none ring-0 lg:hidden"
              onClick={() => setOpenRight(true)}
            >
              Filter
            </Button>

            <select
              value={sortOption}
              onChange={handleSortingChange}
              className="p-2 border rounded"
            >
              <option value="default">Sort by</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="nameAToZ">Name: A to Z</option>
              <option value="nameZToA">Name: Z to A</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {paginatedProducts.map((item, index) => {
              return <ProductCard item={item} key={index} />;
            })}
          </div>
        </div>
      </div>

      <Pagination
        data={productData}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Drawer
        open={openRight}
        onClose={closeDrawerRight}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300, // Set your desired width here (in px, %, or other units)
          },
        }}
      >
        <div className="px-4 pt-2">
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Filter
            </Typography>
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={closeDrawerRight}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <hr />
          <div className="flex flex-col py-4 h-full overflow-auto">
            <>
              <div>
                <h6 className="text-xl">Categories</h6>
                <List dense>
                  {category.map((item, index) => {
                    return (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="comments"
                            onClick={() => handleCatgeoryClick(item)}
                          >
                            <ChevronRight />
                          </IconButton>
                        }
                        disablePadding
                      >
                        <ListItemButton
                          onClick={() => handleCatgeoryClick(item)}
                        >
                          <ListItemText primary={item.category} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </div>

              <hr className="my-3" />

              <div>
                <h6 className="text-xl">Brand</h6>
                <div className="flex flex-col">
                  {brandData.map((item, index) => {
                    return (
                      <Checkbox
                        key={index}
                        label={item}
                        value={item}
                        onChange={(e) => handleFilterClick(e, "brand")}
                      />
                    );
                  })}
                </div>
              </div>

              <hr className="my-3" />

              <div>
                <h6 className="text-xl">Color</h6>
                <div className="flex flex-col mb-9">
                  {colorData.map((item, index) => {
                    return (
                      <Checkbox
                        key={index}
                        label={item}
                        value={item}
                        onChange={(e) => handleFilterClick(e, "color")}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          </div>
        </div>
      </Drawer>
    </Layout>
  );
};

export default Product;
