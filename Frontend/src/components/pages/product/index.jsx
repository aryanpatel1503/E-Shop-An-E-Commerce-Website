import React, { useEffect, useState } from "react";
import Layout from "../../app/Layout";
import SliderComponent from "../../app/SliderComponent";
import ProductCard from "../../app/ProductCard";
import Pagination from "../../app/Pagination";
import { API_URL } from "../../lib/constant";
import axios from "axios";
import { useParams } from "react-router-dom";

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [productData, setProductData] = useState([]);
  const { name } = useParams();

  const currentData = productData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(`${API_URL}/category/${name}`);
      setProductData(response.data.result);
    };
    getProducts();
  }, [name]);

  return (
    <Layout>
      <div className="my-20">
        <div className="flex flex-wrap gap-2">
          {currentData.map((item, index) => {
            return (
              <ProductCard item={item} key={index} cardClassName="w-4/12" />
            );
          })}
        </div>
      </div>

      <Pagination
        data={productData}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Layout>
  );
};

export default Product;
