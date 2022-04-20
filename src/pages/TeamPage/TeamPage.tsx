import React, {useEffect, useState} from "react";
import PageTemplate from "../TemplatePage/PageTemplate";
import teamService from "../../services/team/teamService";
import {useParams} from "react-router-dom";
import {Team} from "./TeamPage.test";
import {Box, Button, Modal} from "@mui/material";

const TeamPage = () => {
    const {id} = useParams();
    const [team, setTeam] = useState<Team>();
    const [open, setOpen] = React.useState(false);
    const [joinLink, setJoinLink] = React.useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (id) {
            teamService.getTeamById(id).then((team) => setTeam(team));
        }
    }, []);

    if (!team) return <div>Loading...</div>;

    function generateLink() {
        if (id) {
            teamService
                .generateJoinLink(id)
                .then((response) => setJoinLink(response.link))
                .then(handleOpen);
        }
    }

    return (
        <PageTemplate>
            <h1>{team.name}</h1>
            <p>{team.description}</p>
            <ul>
                {team.members.map((member, index) => (
                    <li key={member.id + "_" + index}>{member.fullName}</li>
                ))}
            </ul>
            <Button variant={"outlined"} onClick={generateLink}>
                create join link
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>{joinLink}</Box>
            </Modal>
        </PageTemplate>
    );
};

export default TeamPage;
