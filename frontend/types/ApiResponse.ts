import { Auth } from "./Auth";
import { RefreshToken, User } from "./User";

export interface ApiResponse {
  success: boolean;
  message: string;
  auth: Auth;
  data: string | number | User | RefreshToken | null;
  error: {
    code: number;
    message: string;
  };
}
