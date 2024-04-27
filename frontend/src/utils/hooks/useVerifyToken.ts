import { useCallback, useMemo } from "react";
import { useAuthContext } from "./useCustomContext";
import useAxiosInstance from "../config/axiosInstance";
import { ApiResponse } from "../../../types/ApiResponse";
import { useLogoutRedirect } from "../hooks/logoutRedirect";

export const useVerifyToken = () => {
  const logoutRedirect = useLogoutRedirect();

  const { setIsAuth, setUser, setAccessToken, accessToken, setIsLoading } =
    useAuthContext();

  const createAxiosInstance = useAxiosInstance();
  const axiosInstance = useMemo(createAxiosInstance, [
    setAccessToken,
    createAxiosInstance,
  ]);

  const verifyToken = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse>(
        "/auth/verifyToken",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response?.data) {
        const accessTok = response.data.auth?.accessToken;
        const userData = response.data.auth?.user;
        if (accessTok && userData) {
          setUser(userData);
          setAccessToken(accessTok);
          setIsAuth(true);
        } else {
          setUser(null);
          setAccessToken("");
          setIsAuth(false);
          logoutRedirect();
        }
      } else {
        setUser(null);
        setAccessToken("");
        setIsAuth(false);
        logoutRedirect();
      }
    } catch (error) {
      console.error("Failed to verify token", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    logoutRedirect,
    accessToken,
    setIsAuth,
    setIsLoading,
    setUser,
    setAccessToken,
    axiosInstance,
  ]);

  return verifyToken;
};
