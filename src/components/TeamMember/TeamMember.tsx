import React from "react";
import { Box, ListItem } from "@mui/material";
import { Avatar } from "../../services/infrastructure/AvatarGenerator";
import "./teammember.css";

const TeamMember = ({
  fullName,
  avatar,
}: {
  fullName: string;
  avatar: Avatar;
}) => {
  return (
    <Box
      data-testid="member-container"
      sx={{ display: "flex", marginTop: "10px" }}
    >
      <img
        className="team-member-avatar"
        style={{ backgroundColor: avatar.bgColor }}
        src={avatar.link}
        alt="avatar"
        data-testid="team-member-avatar"
      />
      <ListItem>{fullName}</ListItem>
    </Box>
  );
};

export default TeamMember;
