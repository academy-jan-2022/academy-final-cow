import React, { useEffect } from "react";
import PageTemplate from "../TemplatePage/PageTemplate";
import teamService from "../../services/team/teamService";
import { useParams } from "react-router-dom";

const TeamPage = () => {
  // const { id } = useParams();
  const id = "1";
  
  useEffect(() => {
    if (id) {
      const team = teamService.getTeamById(id);
    }
  }, []);

  return <PageTemplate></PageTemplate>;
};

export default TeamPage;
