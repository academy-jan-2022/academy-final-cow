import React from "react";
import { Box, ListItem } from "@mui/material";
import avatarGenerator from "../../services/infrastructure/AvatarGenerator";

const TeamMember = ({ fullName }: { fullName: string }) => {
  const getAvatar = () => {
    return avatarGenerator.randomise();
  };

  return (
    <Box data-testid="member-container">
      <img
        src={getAvatar()}
        alt="memmber profile image"
        data-testid="team-member-avatar"
      />
      <ListItem>{fullName}</ListItem>
    </Box>
  );
};

export default TeamMember;
