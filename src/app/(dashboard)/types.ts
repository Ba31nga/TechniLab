export type Role = {
  id: string;
  name: string;
  color: string;
  description?: string;
  usersCount?: number;
};

export type User = {
  id?: string; // optional for new users
  name: string;
  email: string;
  roles: Role[];
  avatarUrl?: string;
};
