import { useCallback, useMemo } from "react";
import { useAuthContext } from "./useCustomContext";
import useAxiosInstance from "../config/axiosInstance";
import { useLogoutRedirect } from "./logoutRedirect";

export const useLogout = () => {
  const logoutRedirect = useLogoutRedirect();
  const { setIsAuth, setUser, setAccessToken } = useAuthContext();

  const createAxiosInstance = useAxiosInstance();
  const axiosInstance = useMemo(createAxiosInstance, [
    setAccessToken,
    createAxiosInstance,
  ]);

  const logout = useCallback(async () => {
    await axiosInstance.get("/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setUser(null);
    setAccessToken("");
    setIsAuth(false);
    logoutRedirect();
  }, [logoutRedirect, axiosInstance, setIsAuth, setUser, setAccessToken]);

  return logout;
};
