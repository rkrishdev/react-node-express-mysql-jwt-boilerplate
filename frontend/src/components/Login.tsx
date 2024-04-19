import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVerifyToken } from "../utils/hooks/useVerifyToken";
import { useAuthContext } from "../utils/hooks/useCustomContext";
import useAxiosInstance from "../utils/config/axiosInstance";
import { ApiResponse } from "../../types/ApiResponse";

const Login = () => {
  const navigate = useNavigate();
  const [staySignedIn, setStaySignedIn] = useState<boolean>(false);

  const { isAuth, user, setIsAuth, setUser, setAccessToken, setIsLoading } =
    useAuthContext();

  const verifyToken = useVerifyToken();

  const createAxiosInstance = useAxiosInstance();
  const axiosInstance = useMemo(createAxiosInstance, [
    setAccessToken,
    createAxiosInstance,
  ]);

  useEffect(() => {
    if (isAuth && user) {
      navigate("/protected");
    } else {
      verifyToken();
    }
  }, [navigate, isAuth, user, verifyToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    getLoginData();
  };

  const getLoginData = useCallback(async () => {
    setIsLoading(true);

    //use input fields to enter email password
    const response = await axiosInstance.post<ApiResponse>(
      "/auth/login",
      {
        email: "developer@gmail.com",
        password: "Test@2024",
        staySignedIn: staySignedIn,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.data) {
      const refreshTok = response.data.auth?.refreshToken;
      const accessTok = response.data.auth?.accessToken;
      const userData = response.data.auth?.user;
      if (
        response.data.success &&
        refreshTok &&
        accessTok &&
        response.data.auth.authenticated &&
        userData
      ) {
        setUser(userData);
        setAccessToken(accessTok);
        setIsAuth(true);
      }
    }
    setIsLoading(false);
  }, [
    axiosInstance,
    staySignedIn,
    setAccessToken,
    setIsAuth,
    setIsLoading,
    setUser,
  ]);

  return (
    <>
      <div className="flex justify-center">
        <div>
          <h1 className="text-center mb-10">Login Page</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <div>
                <input
                  type="checkbox"
                  name="stay_signed_in"
                  id="stay_signed_in"
                  onChange={(e) => setStaySignedIn(e.currentTarget.checked)}
                />
                <label htmlFor="stay_signed_in"> Stay Signed In?</label>
              </div>
            </div>
            <button type="submit" className="btn mt-10">
              Login
            </button>
          </form>
        </div>
      </div>
      <br />
      <br />
      <Link className="btn" to={"/"} style={{ marginRight: "1rem" }}>
        Go to Home page
      </Link>
      <Link className="btn" to={"/protected"}>
        Go to protected route
      </Link>
    </>
  );
};

export default Login;
