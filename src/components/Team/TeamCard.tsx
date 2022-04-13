import React from "react";
import {Team} from "../../services/team/Team";
import {useNavigate} from "react-router-dom";

const TeamCard = (props: Team) => {
    const navigate = useNavigate();
    const {name, id} = props;

    return (
        <div onClick={() => navigate(`/teams/${id}`)} role="teamCard">
        <h2>{name} </h2>
        </div>
    )
}

export default TeamCard;