import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import teamService from "../../services/team/teamService";
import { useNavigate } from "react-router-dom";
import { ActivityRequest, TeamMember } from "../../services/team/Team";

const ActivityModal = ({
  handleClose = null,
  open = false,
  fetchedMembers,
}: {
  handleClose: any;
  open: boolean;
  fetchedMembers: TeamMember[];
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    borderRadius: "5px",
    p: 4,
  };

  const [activityName, setActivityName] = useState("");
  const [numberOfGroups, setNumberOfGroups] = useState(2);
  const [members, setMembers] = useState<TeamMember[]>(fetchedMembers);
  const [activityNameError, setActivityNameError] = useState(false);

  const navigate = useNavigate();

  const submitActivity = async () => {
    if (activityName) {
      const newActivity: ActivityRequest = {
        activityName,
        numberOfGroups,
        members,
      };

      try {
        await teamService.createActivity(newActivity);
      } catch (e) {
        navigate("/error");
      }
    }

    setActivityNameError(true);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div data-testid="activity-modal">
        <Box sx={style}>
          <Typography data-testid="activity-header-text">
            Create new activity
          </Typography>
          <TextField
            inputProps={{ "data-testid": "activity-name-field" }}
            label={"Activity name"}
            variant="outlined"
            required
            onChange={(e) => {
              setActivityName(e.target.value);
              setActivityNameError(false);
            }}
            error={activityNameError}
          />
          <Button onClick={submitActivity} data-testid="activity-submit-button">
            Submit
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

export default ActivityModal;
