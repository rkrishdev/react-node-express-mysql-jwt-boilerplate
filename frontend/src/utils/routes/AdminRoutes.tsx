import { useRoutes } from "react-router-dom";
import ProtectedRoutes from "../../components/ProtectedRoutes";
import LoginPage from "../../pages/login/LoginPage";
import Dashboard from "../../components/admin/dashboard/Dashboard";
import PanelLayout from "../../layouts/PanelLayout";
import PageNotFound from "../../components/PageNotFound";
import HeaderLayout from "../../layouts/HeaderLayout";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";
import { CssBaseline } from "@mui/material";
import "@fontsource/public-sans";

const AdminRoutes = () => {
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
                children: [{ index: true, element: <LoginPage /> }],
              },
              {
                path: "/",
                element: <PanelLayout />,
                children: [
                  { index: true, element: <Dashboard /> },
                  { path: "admin", element: <Dashboard /> },
                ],
              },
              { path: "*", element: <PageNotFound /> },
            ])}
          </ProtectedRoutes>
        </ThemeProvider>
      ),
    },
    { path: "*", element: <PageNotFound /> },
  ]);

  return routes;
};

export default AdminRoutes;
