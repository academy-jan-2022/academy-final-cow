import React from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";

function Heartbeat() {
  return (
    <>
      <h1>Health check</h1>
      <div role="greenTick">
        <DoneOutlineIcon />
      </div>
      <div role="redCross">
        <CancelIcon />
      </div>
    </>
  );
}

export default Heartbeat;
