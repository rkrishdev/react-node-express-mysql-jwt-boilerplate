import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useVerifyToken } from "../../utils/hooks/useVerifyToken";
import { useAuthContext } from "../../utils/hooks/useCustomContext";
import useAxiosInstance from "../../utils/config/axiosInstance";
import { ApiResponse } from "../../../types/ApiResponse";
import { TextField } from "@mui/material";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [staySignedIn, setStaySignedIn] = useState<boolean>(false);
  const [urlSlug, setUrlSlug] = useState<string>("");

  const { isAuth, user, setIsAuth, setUser, setAccessToken } = useAuthContext();

  const verifyToken = useVerifyToken();

  const createAxiosInstance = useAxiosInstance();
  const axiosInstance = useMemo(createAxiosInstance, [
    setAccessToken,
    createAxiosInstance,
  ]);

  useEffect(() => {
    setUrlSlug(
      location.pathname.split("/") && location.pathname.split("/")[1]
        ? "/" + location.pathname.split("/")[1]
        : "/"
    );
  }, [location]);

  useEffect(() => {
    if (isAuth && user) {
      navigate(urlSlug, { replace: true });
    } else {
      /* verifyToken(); */
    }
  }, [urlSlug, navigate, isAuth, user, verifyToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    getLoginData();
  };

  const getLoginData = useCallback(async () => {
    const urlSlug =
      location.pathname.split("/") && location.pathname.split("/")[1]
        ? location.pathname.split("/")[1]
        : "/";
    const response = await axiosInstance.post<ApiResponse>(
      "/auth/login",
      {
        email: email,
        password: password,
        role: urlSlug,
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
  }, [
    email,
    password,
    location,
    axiosInstance,
    staySignedIn,
    setAccessToken,
    setIsAuth,
    setUser,
  ]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <h1 style={{ textAlign: "center" }}>Login Page</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <TextField
                type="email"
                name="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                autoFocus={true}
                style={{ marginRight: "1rem" }}
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
              <input
                type="checkbox"
                name="staySignedIn"
                id="staySignedIn"
                onChange={(e) => setStaySignedIn(e.currentTarget.checked)}
              />
              <label htmlFor="staySignedIn"> Stay Signed In?</label>
            </div>
            <button className="btn" type="submit">
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
      <Link className="btn" to={urlSlug}>
        Go to protected route
      </Link>
    </>
  );
};

export default Login;
