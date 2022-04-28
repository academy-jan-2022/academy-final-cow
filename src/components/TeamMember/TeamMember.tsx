import React from "react";
import { Box, ListItem } from "@mui/material";
import avatarGenerator from "../../services/infrastructure/AvatarGenerator";
import "./teammember.css";

const TeamMember = ({ fullName }: { fullName: string }) => {
  const getAvatar = () => {
    return avatarGenerator.randomise();
  };

  return (
    <Box
      data-testid="member-container"
      sx={{ display: "flex", marginTop: "10px" }}
    >
      <img
        className="team-member-avatar"
        src={getAvatar()}
        alt="avatar"
        data-testid="team-member-avatar"
      />
      <ListItem>{fullName}</ListItem>
    </Box>
  );
};

export default TeamMember;
