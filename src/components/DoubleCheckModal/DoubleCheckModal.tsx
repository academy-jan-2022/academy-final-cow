import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import "./doubleCheckModal.css";

const DoubleCheckModal = ({
  open,
  handleConfirmButton,
  handleClose,
  heading,
}: {
  open: boolean;
  handleConfirmButton: () => void;
  handleClose: () => void;
  heading: string;
}) => {
  return (
    <Modal open={open} data-testid="double-check-modal">
      <Box className="modal-container">
        <Typography className="modal-container-header">{heading}</Typography>
        <div className={"button-container"}>
          <Button
            variant={"outlined"}
            data-testid="double-check-cancel-button"
            onClick={handleClose}
            color="inherit"
          >
            Cancel
          </Button>

          <Button
            variant={"outlined"}
            data-testid="double-check-confirmation-button"
            onClick={handleConfirmButton}
            className={"button-container-confirm"}
          >
            Yes
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DoubleCheckModal;
