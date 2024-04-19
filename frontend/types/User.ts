export interface User {
  id: string;
  name: string;
  email: string;
  mobile: number;
}

export type RefreshToken = {
  refreshToken: string;
  accessToken: string;
  user: User;
  authenticated: boolean;
};
