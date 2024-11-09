import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const BackdropComponent = () => {
  const { loading } = useSelector((state) => state.cart);

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={loading}
    >
      <CircularProgress sx={{ color: "#F7931E" }} />
    </Backdrop>
  );
};

export default BackdropComponent;
