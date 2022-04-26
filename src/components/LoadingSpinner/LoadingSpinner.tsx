import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <CircularProgress data-testid="loading-spinner"
      sx={{ display: "flex", margin: "100px auto" }}
      size={100}
    />
  );
};

export default LoadingSpinner;
