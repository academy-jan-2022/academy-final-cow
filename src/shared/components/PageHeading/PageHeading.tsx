import React from "react";
import { Typography } from "@mui/material";

const PageHeading: React.FC = ({ children }) => {
  return <Typography variant="h1" mb={2} mt={2} fontSize={50}>{children}</Typography>;
};

export default PageHeading;
