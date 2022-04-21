import React from "react";
import { Team } from "../../services/team/Team";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";

const TeamCard = (props: { team: any; }) => {
  const navigate = useNavigate();
  const { team } = props;
  const { name, id, description } = team;

  return (
    <Card onClick={() => navigate(`/teams/${id}`)} role="teamCard">
      <h2>{name} </h2>
      <p>{description}</p>
    </Card>
  );
};

export default TeamCard;