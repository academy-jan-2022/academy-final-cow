import React from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  Modal,
  OutlinedInput,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const JoinLinkModal = ({
  joinLink,
  handleClose,
  open,
}: {
  joinLink: string;
  handleClose: any;
  open: boolean;
}) => {
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(joinLink);
  };

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
      <Box sx={style}>
        <OutlinedInput
          sx={{ width: "100%" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={copyLinkToClipboard}
                onMouseDown={copyLinkToClipboard}
                edge="end"
              >
                <ContentCopyIcon />
              </IconButton>
            </InputAdornment>
          }
          value={joinLink}
          inputProps={{
            readOnly: true,
          }}
        />
      </Box>
    </Modal>
  );
};

export default JoinLinkModal;
