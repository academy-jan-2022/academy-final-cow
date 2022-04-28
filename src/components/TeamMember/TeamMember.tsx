import React from "react";
import { Box, ListItem } from "@mui/material";

const TeamMember = ({ fullName }: { fullName: string }) => {
  return (
    <Box data-testid="member-container">
      <ListItem>{fullName}</ListItem>
    </Box>
  );
};

export default TeamMember;
