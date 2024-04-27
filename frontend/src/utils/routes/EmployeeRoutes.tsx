import { useRoutes } from "react-router-dom";
import LoginPage from "../../pages/login/LoginPage";
import ProtectedRoutes from "../../components/ProtectedRoutes";
import Dashboard from "../../components/employee/dashboard/Dashboard";
import PanelLayout from "../../layouts/PanelLayout";
import PageNotFound from "../../components/PageNotFound";
import HeaderLayout from "../../layouts/HeaderLayout";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";
import { CssBaseline } from "@mui/material";

const EmployeeRoutes = () => {
  const routes = useRoutes([
    {
      path: "*",
      element: (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ProtectedRoutes>
            {useRoutes([
              {
                path: "login",
                element: <HeaderLayout />,
                children: [
                  {
                    index: true,
                    element: <LoginPage />,
                  },
                ],
              },
              {
                path: "/",
                element: <PanelLayout />,
                children: [
                  {
                    index: true,
                    element: <Dashboard />,
                  },
                ],
              },
              {
                path: "*",
                element: <PageNotFound />,
              },
            ])}
          </ProtectedRoutes>
        </ThemeProvider>
      ),
    },
  ]);
  return routes;
};

export default EmployeeRoutes;
