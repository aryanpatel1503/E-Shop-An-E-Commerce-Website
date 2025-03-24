import React, { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({
  data,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  alignRight = false,
  buttonName = true,
}) => {
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setCurrentPage(index);
    },
  });

  const next = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  if (data?.length === 0) {
    return null;
  }

  return (
    <div
      className={`flex flex-wrap ${
        alignRight ? "justify-center xs:justify-end" : "justify-center"
      } items-center gap-4 my-4`}
    >
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        {buttonName && "Previous"}
      </Button>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => {
          return (
            <IconButton {...getItemProps(i + 1)} key={i}>
              {i + 1}
            </IconButton>
          );
        })}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        {buttonName && "Next"}
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
