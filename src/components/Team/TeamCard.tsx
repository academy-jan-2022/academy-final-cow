import React from "react";
import {Team} from "../../services/team/Team";

const TeamCard = (props: Team) => {
    const {name} = props

    return (
        <div role="teamCard">
        <h2>{name} </h2>
        </div>
    )
}

export default TeamCard;