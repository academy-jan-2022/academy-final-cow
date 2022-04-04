import React from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

function Heartbeat() {
  return (
    <>
      <h1>Health check</h1>
      <div role="greenTick">
        <DoneOutlineIcon />
      </div>
    </>
  );
}

export default Heartbeat;
