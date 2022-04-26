import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
  Checkbox,
} from "@mui/material";
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
    display: "flex",
    flexDirection: "column",
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
    } else {
      setActivityNameError(true);
    }
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
          <Stack spacing={2}>
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
            <TextField
              type="number"
              inputProps={{ "data-testid": "activity-input-amount-groups" }}
              onChange={(e) => {
                setNumberOfGroups(parseInt(e.target.value));
              }}
              value={numberOfGroups}
            />
            {fetchedMembers.map((member) => (
              <Checkbox
                defaultChecked
                data-testid="user-checkbox"
                key={`user-checkbox-${member.fullName}`}
                onChange={(e) => {
                  if (members.filter((e) => e.id === member.id).length > 0) {
                    setMembers(members.filter((user) => user.id !== member.id));
                  } else {
                    setMembers([...members, member]);
                  }
                }}
              />
            ))}
            <Button
              variant={"outlined"}
              onClick={submitActivity}
              data-testid="activity-submit-button"
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </div>
    </Modal>
  );
};

export default ActivityModal;
