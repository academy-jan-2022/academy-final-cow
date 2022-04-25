export type CreateTeamRequest = {
  name: string;
  description: string;
};

export type TeamMember = {
  id: string;
  fullName: string;
};

export type GetTeamResponse = {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
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
