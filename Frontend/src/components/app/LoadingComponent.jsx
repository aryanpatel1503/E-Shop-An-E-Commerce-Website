import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen z-10">
      <CircularProgress sx={{ color: "#F7931E" }} />
    </div>
  );
};

export default LoadingComponent;
