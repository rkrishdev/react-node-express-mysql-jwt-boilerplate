import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useCustomContext";
import useAxiosInstance from "../config/axiosInstance";

export const useLogout = () => {
  const navigate = useNavigate();

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
    navigate("/login");
  }, [axiosInstance, setIsAuth, setUser, setAccessToken, navigate]);

  return logout;
};
