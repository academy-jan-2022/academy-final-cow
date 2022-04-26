import React, { useEffect, useState } from "react";
import PageTemplate from "../TemplatePage/PageTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { GetTeamResponse } from "../../services/team/Team";

import PageHeading from "../../components/PageHeading/PageHeading";
import { Box, Button, List, ListItem, Stack, Typography } from "@mui/material";
import teamService from "../../services/team/teamService";
import JoinLinkModal from "../../components/JoinLinkModal/JoinLinkModal";
import ActivityModal from "../../components/ActivityModal/ActivityModal";
import ActivitiesContainer from "../../components/ActivitiesContainer/ActivitiesContainer";

const TeamPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState<GetTeamResponse>();
  const [showJoinLinkModal, setShowJoinLinkModal] = React.useState(false);
  const [joinLink, setJoinLink] = React.useState("");
  const [isLoading, toggleLoading] = useState(true);

  const [showActivityModal, toggleActivityModal] = useState(false);

  const handleOpen = () => setShowJoinLinkModal(true);
  const handleClose = () => setShowJoinLinkModal(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      teamService.getTeamById(id).then((fetchedTeam) => {
        setTeam(fetchedTeam);
        toggleLoading(false);
      });
      // .catch(() => navigate("/error"));
      setTeam({
        id: "1",
        name: "TEAM_NAME",
        description: "TEAM_DESCRIPTION",
        members: [
          {
            id: "USER_ONE_ID",
            fullName: "USER_ONE_FULL_NAME",
          },
          {
            id: "USER_TWO_ID",
            fullName: "USER_TWO_FULL_NAME",
          },
        ],
        activities: [
          {
            name: "My activity",
            groups: [[{ name: "cowboy" }, { name: "cowgirl" }]],
          },
          {
            name: "My activity 2",
            groups: [
              [{ name: "fishboy" }, { name: "fishgirl" }],
              [{ name: "chickenboy" }, { name: "chickengirl" }],
            ],
          },
        ],
      });
      toggleLoading(false);
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
      <PageHeading>{team?.name}</PageHeading>
      <Stack alignSelf="flex-start" alignItems="flex-start" spacing={2}>
        <Typography component="p">{team?.description}</Typography>
        <List>
          Members:
          {team?.members.map((member, index) => (
            <ListItem key={member.id + "_" + index}>{member.fullName}</ListItem>
          ))}
        </List>
        <Button variant={"outlined"} onClick={generateLink}>
          create join link
        </Button>
        <Button variant={"outlined"} onClick={() => toggleActivityModal(true)}>
          create new activity
        </Button>
        {renderActivityBox()}
      </Stack>
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
