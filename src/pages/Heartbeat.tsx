import React, { useEffect, useState } from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import client from "../services/HttpClient";

interface HeartbeatResponse {
  status: String;
  components: {
    db: {
      status: String;
    }
  }
}

function Heartbeat() {
  const [backendStateIsHealthy, setBackendState] = useState(false);
  const [databaseStatus, setDatabaseStatus] = useState(false);

  useEffect(() => {
    client
      .get<HeartbeatResponse>({ url: `${process.env.REACT_APP_HEARTBEAT_URL}` })
      .then((resp: HeartbeatResponse) => {
        if (resp.status === "UP") setBackendState(true);
        if (resp.components.db.status === "UP") setDatabaseStatus((true));
      });
  }, []);

  return (
    <>
      <h1>Health check</h1>
      {backendStateIsHealthy ? (
        <div role="backendIsUp">
          <p>Backend status:</p>
          <DoneOutlineIcon />
          {databaseStatus ? (
              <div role="databaseIsUp">
                <p>Database status:</p>
                <DoneOutlineIcon />
              </div>
          ) : (<div role="databaseIsDown">
            <p>Database status:</p>
            <CancelIcon />
          </div>
            )}
        </div>
      ) : (
        <div role="backendIsDown">
          <p>Backend status:</p>
          <CancelIcon />
          <p>Database status:</p>
          <CancelIcon />
        </div>
      )}
    </>
  );
}

export default Heartbeat;
