import React from "react";
import { Button, Modal, Typography } from "@mui/material";

const DoubleCheckModal = ({
  open,
  handleConfirmButton,
  heading,
}: {
  open: boolean;
  handleConfirmButton: () => void;
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
          salu2
        </Button>
      </div>
    </Modal>
  );
};

export default DoubleCheckModal;
