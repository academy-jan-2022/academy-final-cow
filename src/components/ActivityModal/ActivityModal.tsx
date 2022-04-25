import React from "react";
import { Box, Modal, TextField, Typography } from "@mui/material";

const ActivityModal = ({
  handleClose = null,
  open = false,
}: {
  handleClose: any;
  open: boolean;
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div data-testid="activity-modal">
        <Box sx={style}>
          <Typography data-testid={"activity-header-text"}>Create new activity</Typography>
          <TextField data-testid={"activity-name-field"} label={"Activity name"}/>
        </Box>
      </div>
    </Modal>
  );
};

export default ActivityModal;
