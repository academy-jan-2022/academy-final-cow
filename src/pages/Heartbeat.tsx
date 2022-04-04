import React, { useEffect, useState } from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { HttpClient } from "../Services/HttpClient";

interface HeartbeatRespose {
  status: number;
}

function Heartbeat() {
  const [backendStateIsHealthy, setBackendState] = useState(false);
  const client = new HttpClient();

  useEffect(() => {
    client
      .get<HeartbeatRespose>({ url: `http://localhost:3000` })
      .then((resp: HeartbeatRespose) => {
        console.log(resp);
        if (resp.status == 200) setBackendState(true);
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
