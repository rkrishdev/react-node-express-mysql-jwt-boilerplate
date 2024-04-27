import axios from "axios";
import { useAuthContext } from "../hooks/useCustomContext";
import { useCallback } from "react";

const useAxiosInstance = () => {
  const { accessToken, setIsAuth, setUser, setAccessToken } = useAuthContext();

  const createAxiosInstance = useCallback(() => {
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_PUBLIC_URL,
      timeout: 1000,
      withCredentials: true,
      validateStatus: function (status) {
        return status >= 200 && status < 600;
      },
    });

    axiosInstance.interceptors.response.use((response) => {
      if (!response.data?.success) {
        setUser(null);
        setAccessToken("");
        setIsAuth(false);
      }
      const accessTok = response.data?.auth?.accessToken;
      const userData = response.data?.auth?.user;
      if (accessTok && userData) {
        if (accessTok !== accessToken) {
          setAccessToken(accessTok);
          setUser(userData);
          setIsAuth(true);
        }
      }
      return response;
    });

    return axiosInstance;
  }, [accessToken, setIsAuth, setUser, setAccessToken]);

  return createAxiosInstance;
};

export default useAxiosInstance;
