import React, { useState, ChangeEvent } from "react";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ActivityResponse } from "../../services/team/Team";

const ActivitiesContainer = ({
  activities,
}: {
  activities: ActivityResponse[];
}) => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

  const handleSelectOnChange = (event: SelectChangeEvent) => {
    setCurrentActivityIndex(parseInt(event.target.value));
  };

  return (
    <div data-testid={"activity-box"}>
      <Select
        label="Activity"
        onChange={handleSelectOnChange}
        inputProps={{ "data-testid": "activity-selector" }}
      >
        {activities.map((activity, index) => (
          <MenuItem key={activity.name} value={index}>
            {activity.name}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="h3" data-testid="activity-name-text">
        {activities[currentActivityIndex].name}
      </Typography>
      {activities[currentActivityIndex].groups.map((group) => (
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
