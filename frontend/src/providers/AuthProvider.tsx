import { useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { User } from "../../types/User";
import Loader from "../components/shared/Loader";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<null | string>("");
  const [user, setUser] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        accessToken,
        user,
        isLoading,
        setIsAuth,
        setAccessToken,
        setUser,
        setIsLoading,
      }}
    >
      {isLoading ? <Loader /> : ""}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
