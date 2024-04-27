import { useLocation, useNavigate } from "react-router-dom";
import { convertToRoleData } from "../utils/globals";
import { useAuthContext } from "../utils/hooks/useCustomContext";
import { useVerifyToken } from "../utils/hooks/useVerifyToken";
import { useEffect } from "react";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, user } = useAuthContext();

  const verifyToken = useVerifyToken();

  useEffect(() => {
    if (!isAuth || !user) {
      verifyToken();
    } else {
      if (user.roleValue) {
        //get current panel slug
        const urlSlug =
          location.pathname.split("/") && location.pathname.split("/")[1]
            ? location.pathname.split("/")[1]
            : "/";
        //get user role and convert it to slug
        const getSlug = convertToRoleData(user.roleValue);
        const slug = getSlug ? getSlug : "";
        if (slug !== urlSlug) {
          const toUrl = convertToRoleData(slug, "string") as string;
          navigate("/" + toUrl);
        }
      } else {
        navigate("/");
      }
    }
  }, [location, navigate, verifyToken, isAuth, user]);

  return children;
};

export default ProtectedRoutes;
