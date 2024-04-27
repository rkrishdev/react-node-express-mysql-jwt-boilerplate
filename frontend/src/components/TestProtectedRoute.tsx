import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../utils/hooks/useCustomContext";
import { useLogout } from "../utils/hooks/useLogout";
import useAxiosInstance from "../utils/config/axiosInstance";
import { ApiResponse } from "../../types/ApiResponse";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const TestProtectedRoute = () => {
  const logout = useLogout();
  const { isAuth, user, accessToken } = useAuthContext();

  const createAxiosInstance = useAxiosInstance();
  const axiosInstance = useMemo(createAxiosInstance, [createAxiosInstance]);

  const checkProtectedRoute = useCallback(async () => {
    const response = await axiosInstance.get<ApiResponse>("/dummyData", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
      validateStatus: function (status) {
        return status >= 200 && status < 600;
      },
    });

    if (response) {
      return response.data;
    }
  }, [accessToken, axiosInstance]);

  const { data, refetch, error, isError } = useQuery({
    queryKey: ["dummyData"],
    queryFn: checkProtectedRoute,
  });

  const [text, setText] = useState<string | null>(JSON.stringify(data) || "");

  useEffect(() => {
    if (isAuth && data) {
      setText(JSON.stringify(data));
    } else {
      setText("");
    }
  }, [isAuth, data]);

  const handleClick = async () => {
    await refetch();
  };

  if (isError) {
    console.error(error.message);
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", textAlign: "center" }}
    >
      <div>
        <div>This is a protected route.</div>
        <br />
        <p>Hi {user?.name}!</p>
        <br />
        <div
          style={{
            maxWidth: "600px",
            wordBreak: "break-all",
            whiteSpace: "wrap",
          }}
        >
          <p>Api response:</p>
          <p>{text}</p>
        </div>
        <br />
        <br />
        <Link className="btn" to={"/protected/test"}>
          To test 2
        </Link>
        <button type="button" className="btn" onClick={handleClick}>
          Check protected api request
        </button>
        <button type="button" className="btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TestProtectedRoute;
