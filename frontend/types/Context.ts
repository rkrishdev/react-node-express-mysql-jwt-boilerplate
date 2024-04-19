import { User } from "./User";

export interface AuthTypeContext {
  isAuth: boolean;
  accessToken: null | string;
  user: null | User;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setIsAuth: (isAuth: boolean) => void;
  setAccessToken: (accessToken: null | string) => void;
  setUser: (user: null | User) => void;
}
