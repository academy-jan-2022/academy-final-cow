import React, { useEffect, useState } from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import client from "../services/HttpClient";

interface HeartbeatRespose {
  status: number;
}

function Heartbeat() {
  const [backendStateIsHealthy, setBackendState] = useState(false);

  useEffect(() => {
    client
      .get<HeartbeatRespose>({ url: `${process.env.REACT_APP_HEARTBEAT_URL}` })
      .then((resp: HeartbeatRespose) => {
        if (resp.status === 200) setBackendState(true);
      });
  }, []);

  return (
    <>
      <h1>Health check</h1>
      {backendStateIsHealthy ? (
        <div role="greenTick">
          <DoneOutlineIcon />
        </div>
      ) : (
        <div role="redCross">
          <CancelIcon />
        </div>
      )}
    </>
  );
}

export default Heartbeat;
