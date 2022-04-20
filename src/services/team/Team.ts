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
