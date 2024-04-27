import { Route, Routes } from "react-router-dom";
import AuthProvider from "../../providers/AuthProvider";
import AdminRoutes from "./AdminRoutes";
import EmployeeRoutes from "./EmployeeRoutes";
import PageNotFound from "../../components/PageNotFound";

const AuthProviderRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="admin/*" element={<AdminRoutes />} />
        <Route path="employee/*" element={<EmployeeRoutes />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default AuthProviderRoutes;
