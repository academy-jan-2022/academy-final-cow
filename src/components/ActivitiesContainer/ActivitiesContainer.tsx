import React from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { ActivityResponse } from "../../services/team/Team";

const ActivitiesContainer = ({
  activities,
}: {
  activities: ActivityResponse[];
}) => {
  return (
    <div data-testid={"activity-box"}>
      <Select label="Activity" onChange={null} data-testid="activity-selector">
        <MenuItem value={10}>Ten</MenuItem>
      </Select>
      <Typography variant="h3" data-testid="activity-name-text">
        {activities[0].name}
      </Typography>
      {activities[0].groups.map((group) => (
        <Box key={Math.random()} data-testid="activity-member-box">
          {group.map((user) => (
            <Typography
              variant="body1"
              data-testid="activity-member-text"
              key={user.name}
            >
              {user.name}
            </Typography>
          ))}
        </Box>
      ))}
    </div>
  );
};

export default ActivitiesContainer;
