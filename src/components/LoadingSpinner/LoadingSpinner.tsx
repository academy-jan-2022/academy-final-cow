import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <CircularProgress
      sx={{ display: "flex", margin: "100px auto" }}
      size={100}
    />
  );
};

export default LoadingSpinner;
