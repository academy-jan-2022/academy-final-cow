import React, { useEffect, useState } from "react";
import PageTemplate from "../TemplatePage/PageTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { TeamWithMembers } from "../../services/team/Team";
import "./team.css";
import PageHeading from "../../components/PageHeading/PageHeading";
import { Button, List, ListItem, Typography, Container } from "@mui/material";
import teamService from "../../services/team/teamService";
import JoinLinkModal from "../../components/JoinLinkModal/JoinLinkModal";
import ActivityModal from "../../components/ActivityModal/ActivityModal";
import ActivitiesContainer from "../../components/ActivitiesContainer/ActivitiesContainer";

import sadcowboy from "../../images/sadcowboy.png";

const TeamPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState<TeamWithMembers>();
  const [open, setOpen] = React.useState(false);
  const [showJoinLinkModal, setShowJoinLinkModal] = React.useState(false);
  const [joinLink, setJoinLink] = React.useState("");
  const [isLoading, toggleLoading] = useState(true);

  const [showActivityModal, toggleActivityModal] = useState(false);

  const handleOpen = () => setShowJoinLinkModal(true);
  const handleClose = () => setShowJoinLinkModal(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      teamService
        .getTeamById(id)
        .then((response) => {
          setTeam(response.team);
          toggleLoading(false);
        })
        .catch(() => navigate("/error"));
    }
  }, [id, navigate]);

  function generateLink() {
    if (id) {
      teamService
        .generateJoinLink(id)
        .then((response) => setJoinLink(response.link))
        .then(handleOpen);
    }
  }

  const renderActivityBox = () => {
    const activitiesExistOnTeam =
      team && team.activities && team.activities.length > 0;

    if (activitiesExistOnTeam) {
      const activities = team?.activities || [];
      return <ActivitiesContainer activities={activities} />;
    }
    return <></>;
  };

  return (
    <PageTemplate isLoading={isLoading}>
      <Container sx={{ display: "flex", marginTop: "25px", height: "100%" }}>
        <Container sx={{ flex: 1 }}>
          <img
            className="team-logo"
            src={sadcowboy}
            alt="team logo"
            data-testid="team-image"
          />
          <List>
            <Typography variant="h4">Members:</Typography>
            {team?.members.map((member, index) => (
              <ListItem key={member.id + "_" + index}>
                {member.fullName}
              </ListItem>
            ))}
          </List>
          <Button variant={"outlined"} onClick={generateLink}>
            create join link
          </Button>
        </Container>
        <Container sx={{ flex: 2 }}>
          <PageHeading>{team?.name}</PageHeading>
          <Typography component="p">{team?.description}</Typography>
          {renderActivityBox()}
          <Button
            variant={"outlined"}
            onClick={() => toggleActivityModal(true)}
          >
            create new activity
          </Button>
        </Container>
      </Container>
      <ActivityModal
        open={showActivityModal}
        handleClose={() => toggleActivityModal(false)}
        fetchedMembers={team?.members || []}
      />
      <JoinLinkModal
        joinLink={joinLink}
        open={showJoinLinkModal}
        handleClose={handleClose}
      />
    </PageTemplate>
  );
};

export default TeamPage;
