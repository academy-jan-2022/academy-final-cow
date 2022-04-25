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
