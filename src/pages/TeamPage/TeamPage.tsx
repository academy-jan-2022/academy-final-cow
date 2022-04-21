import React, {useEffect, useState} from "react";
import PageTemplate from "../TemplatePage/PageTemplate";
import teamService from "../../services/team/teamService";
import {useParams} from "react-router-dom";
import {Team} from "./TeamPage.test";
import {Box, Button, IconButton, InputAdornment, Modal, TextField} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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

    function generateLink() {
        if (id) {
            teamService
                .generateJoinLink(id)
                .then((response) => setJoinLink(response.link))
                .then(handleOpen);
        }
    }

    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(joinLink);
    }

    if (!team) return <div>Loading...</div>;

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
                <Box>
                    <TextField
                        variant="outlined"
                        value={joinLink}
                        inputProps={
                            {
                                readOnly: true,
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={copyLinkToClipboard}
                                        onMouseDown={copyLinkToClipboard}
                                        edge="end"
                                    >
                                        <ContentCopyIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        }
                    />
                </Box>
            </Modal>
        </PageTemplate>
    );
};

export default TeamPage;
