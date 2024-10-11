import React, { useState } from "react";
import Layout from "../../app/Layout";
import SliderComponent from "../../app/SliderComponent";
import ProudctCard from "../../app/ProudctCard";
import Pagination from "../../app/Pagination";

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const productData = [
    {
      imgUrl: "",
      title: "Mobile",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Laptop",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Keyboard",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Mouse",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Mouse1",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Mouse2",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Mouse3",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Mouse4",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Mouse5",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Mouse6",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Mouse7",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Mouse8",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Mouse9",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Mouse10",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Mouse11",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Mouse12",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Mouse13",
      price: "999",
    },
    {
      imgUrl: "",
      title: "Mouse14",
      price: "999",
    },
  ];

  const currentData = productData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div className="my-20">
        <div className="flex flex-wrap gap-2">
          {currentData.map((item, index) => {
            return (
              <ProudctCard item={item} key={index} cardClassName="w-4/12" />
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
