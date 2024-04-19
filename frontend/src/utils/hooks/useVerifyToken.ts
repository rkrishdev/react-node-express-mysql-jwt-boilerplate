import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useCustomContext";
import useAxiosInstance from "../config/axiosInstance";
import { ApiResponse } from "../../../types/ApiResponse";

export const useVerifyToken = () => {
  const navigate = useNavigate();

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
        }
      } else {
        setUser(null);
        setAccessToken("");
        setIsAuth(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to verify token", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    accessToken,
    setIsAuth,
    setIsLoading,
    setUser,
    setAccessToken,
    navigate,
    axiosInstance,
  ]);

  return verifyToken;
};
