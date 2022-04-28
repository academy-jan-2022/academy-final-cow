import React from "react";
import { Button, Modal, Typography } from "@mui/material";

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
      <div>
        <Typography>{heading}</Typography>
        <Button
          variant={"outlined"}
          data-testid="double-check-confirmation-button"
          onClick={handleConfirmButton}
        >
          Yes
        </Button>
        <Button
          variant={"outlined"}
          data-testid="double-check-cancel-button"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DoubleCheckModal;
