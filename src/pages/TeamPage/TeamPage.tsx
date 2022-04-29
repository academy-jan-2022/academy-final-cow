import React, { useEffect, useState } from "react";
import PageTemplate from "../TemplatePage/PageTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { TeamWithMembers } from "../../services/team/Team";
import "./team.css";
import "../../index.css";
import PageHeading from "../../components/PageHeading/PageHeading";
import { Button, Container, List, Tooltip, Typography } from "@mui/material";
import teamService from "../../services/team/teamService";
import JoinLinkModal from "../../components/JoinLinkModal/JoinLinkModal";
import ActivityModal from "../../components/ActivityModal/ActivityModal";
import ActivitiesContainer from "../../components/ActivitiesContainer/ActivitiesContainer";

import TeamMember from "../../components/TeamMember/TeamMember";

import sadcowboy from "../../images/sadcowboy.png";
import DoubleCheckModal from "../../components/DoubleCheckModal/DoubleCheckModal";
import { PageRoutes } from "../pageRoutes";
import avatarGenerator, {
  Avatar,
} from "../../services/application/AvatarGenerator";

const TeamPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState<TeamWithMembers>();
  const [showJoinLinkModal, setShowJoinLinkModal] = React.useState(false);
  const [joinLink, setJoinLink] = React.useState("");
  const [isLoading, toggleLoading] = useState(true);
  const [avatarList, setAvatarList] = useState<Avatar[]>([]);

  const [showActivityModal, toggleActivityModal] = useState(false);
  const [showDoubleCheckModal, toggleDoubleCheckModal] = useState(false);

  const handleOpen = () => setShowJoinLinkModal(true);
  const handleClose = () => setShowJoinLinkModal(false);

  const navigate = useNavigate();

  const getTeam = () => {
    if (id) {
      teamService
        .getTeamById(id)
        .then((response) => {
          setTeam(response.team);
          setAvatarList(
            avatarGenerator.generateAvatarList(response.team.members)
          );
          toggleLoading(false);
        })
        .catch(() => navigate(PageRoutes.ERROR));
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

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

  const handleRemoveUser = async () => {
    try {
      if (id) {
        toggleLoading(true);
        await teamService.removeUser(id);
        navigate(PageRoutes.TEAMS);
      }
    } catch (e) {
      navigate(PageRoutes.ERROR);
    }
  };

  const canCreateActivity = (): boolean => {
    if (team) {
      return team.members.length >= 3;
    }
    return false;
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
          <List sx={{ marginBottom: "20px" }}>
            <Typography variant="h4">Members:</Typography>
            {team?.members.map((member, index) => (
              <TeamMember
                key={member.id + "_" + index}
                fullName={member.fullName}
                avatar={avatarList[index]}
              />
            ))}
          </List>
          <Tooltip
            disableFocusListener
            disableTouchListener
            disableHoverListener={canCreateActivity()}
            title={"You need at least 3 team members to create an activity"}
          >
            <span>
              <Button
                variant={"outlined"}
                onClick={() => toggleActivityModal(true)}
                disabled={!canCreateActivity()}
                className={canCreateActivity() ? "blue-button" : ""}
              >
                create new activity
              </Button>
            </span>
          </Tooltip>
        </Container>
        <Container sx={{ flex: 2 }} className={"activity-container"}>
          <div>
            <PageHeading>{team?.name}</PageHeading>
            <Typography component="p">{team?.description}</Typography>
            {renderActivityBox()}
          </div>
          <div className={"activity-buttoncontainer"}>
            <Button
              variant={"outlined"}
              onClick={generateLink}
              className={"blue-button"}
            >
              create join link
            </Button>

            <Button
              variant={"outlined"}
              data-testid={"leave-team-button"}
              onClick={() => toggleDoubleCheckModal(true)}
              className={"red-button"}
            >
              leave team
            </Button>
          </div>
        </Container>
      </Container>
      <ActivityModal
        open={showActivityModal}
        handleClose={() => toggleActivityModal(false)}
        fetchedMembers={team?.members || []}
        teamId={id}
        toggleLoading={toggleLoading}
        getTeam={getTeam}
      />
      <JoinLinkModal
        joinLink={joinLink}
        open={showJoinLinkModal}
        handleClose={handleClose}
      />
      <DoubleCheckModal
        open={showDoubleCheckModal}
        handleClose={() => toggleDoubleCheckModal(false)}
        handleConfirmButton={handleRemoveUser}
        heading={"Are you sure you want to leave?"}
      />
    </PageTemplate>
  );
};

export default TeamPage;
