import React, { useState } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  FormControl,
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
    <Box
      sx={{ border: "1px solid #333", padding: "20px", borderRadius: "5px" }}
      data-testid={"activity-box"}
    >
      <FormControl fullWidth>
        <InputLabel id="activity-label">Current Activity</InputLabel>
        <Select
          labelId="activity-label"
          label="Current Activity"
          onChange={handleSelectOnChange}
          inputProps={{ "data-testid": "activity-selector", label: "Activity" }}
          value={currentActivityIndex.toString()}
        >
          {activities.map((activity, index) => (
            <MenuItem key={activity.name} value={index}>
              {activity.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h4" data-testid="activity-name-text">
        {activities[currentActivityIndex].name}
      </Typography>
      {activities[currentActivityIndex].groups.map((group) => (
        <Box
          key={Math.random()}
          data-testid="activity-member-box"
          sx={{ padding: "20px", margin: "10px", bgcolor: "lightblue" }}
        >
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
    </Box>
  );
};

export default ActivitiesContainer;
