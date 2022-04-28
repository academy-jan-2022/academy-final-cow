import React from "react";
import { Button, Modal } from "@mui/material";

const DoubleCheckModal = ({
  open,
  handleConfirmButton,
}: {
  open: boolean;
  handleConfirmButton: (teamId: string) => Promise<void>;
}) => {
  return (
    <Modal open={open} data-testid="double-check-modal">
      <div>
        <Button
          variant={"outlined"}
          onClick={handleConfirmButton}
          data-testid="double-check-confirmation-button"
        >
          salu2
        </Button>
      </div>
    </Modal>
  );
};

export default DoubleCheckModal;
