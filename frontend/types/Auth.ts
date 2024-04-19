import { User } from "./User";

export type Auth = {
  accessToken: string;
  refreshToken: string;
  user: User;
  authenticated: boolean;
};
