import React, { useEffect, useState } from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import client, { API_ENDPOINT } from "../../services/infrastructure/ApiClient";
import PageHeading from "../../components/PageHeading/PageHeading";

interface HeartbeatResponse {
  status: string;
  components: {
    db: {
      status: string;
    };
  };
}

function HeartbeatPage() {
  const [backendStateIsHealthy, setBackendState] = useState(false);
  const [databaseStatus, setDatabaseStatus] = useState(false);

  useEffect(() => {
    client
      .get<HeartbeatResponse>({ route: API_ENDPOINT.HEARTBEAT })
      .then((resp: HeartbeatResponse) => {
        if (resp.status === "UP") setBackendState(true);
        if (resp.components.db.status === "UP") setDatabaseStatus(true);
      });
  }, []);
  return (
    <>
      <PageHeading>Health check</PageHeading>
      <p>Backend status:</p>
      {backendStateIsHealthy ? (
        <div role="backendIsUp">
          <DoneOutlineIcon />
        </div>
      ) : (
        <div role="backendIsDown">
          <CancelIcon />
        </div>
      )}
      <p>Database status:</p>
      {databaseStatus ? (
        <div role="databaseIsUp">
          <DoneOutlineIcon />
        </div>
      ) : (
        <div role="databaseIsDown">
          <CancelIcon />
        </div>
      )}
    </>
  );
}

export default HeartbeatPage;
