import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

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
      <Box sx={style}>
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
      </Box>
    </Modal>
  );
};

export default DoubleCheckModal;
