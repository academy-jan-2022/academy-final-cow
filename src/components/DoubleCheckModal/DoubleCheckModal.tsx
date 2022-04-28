import React from "react";
import { Modal } from "@mui/material";

const DoubleCheckModal = ({ open }: { open: boolean }) => {
  return (
    <Modal open={open} data-testid="double-check-modal">
      <p>hola</p>
    </Modal>
  );
};

export default DoubleCheckModal;
