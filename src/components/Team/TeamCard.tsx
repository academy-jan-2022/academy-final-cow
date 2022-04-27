import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { TeamByUser } from "../../services/team/Team";

const TeamCard = (props: { team: TeamByUser }) => {
  const navigate = useNavigate();
  const { team } = props;
  const { name, id, description } = team;

  return (
    <Card onClick={() => navigate(`/team/${id}`)} role="teamCard">
      <h2>{name} </h2>
      <p>{description}</p>
    </Card>
  );
};

export default TeamCard;
