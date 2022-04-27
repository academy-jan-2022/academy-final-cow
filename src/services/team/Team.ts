export type CreateTeamRequest = {
  name: string;
  description: string;
};

export type TeamMember = {
  id: string;
  fullName: string;
};

export type TeamWithMembers = {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  activities?: ActivityResponse[];
};

export type GetTeamResponse = {
  team: TeamWithMembers;
};

export type TeamByUser = {
  id: string;
  name: string;
  description: string;
};

export type GetTeamsResponse = {
  teams: TeamByUser[];
};

export type ActivityRequest = {
  activityName: string;
  numberOfGroups: number;
  members: TeamMember[];
};

export type ActivityResponse = {
  name: string;
  groups: activityMember[][];
};

export type activityMember = {
  name: string;
};
