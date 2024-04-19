import { useAuthContext } from "../utils/hooks/useCustomContext";
import { useVerifyToken } from "../utils/hooks/useVerifyToken";
import { useEffect } from "react";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, user } = useAuthContext();

  const verifyToken = useVerifyToken();

  useEffect(() => {
    if (!isAuth || !user) {
      verifyToken();
    }
  }, [verifyToken, isAuth, user]);

  return children;
};

export default ProtectedRoutes;
