import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Landing from "./pages/landing/LandingPage";
import LoginPage from "./pages/login/LoginPage";
import AuthProvider from "./providers/AuthProvider";
import TestProtectedRoute from "./components/TestProtectedRoute";
import ProtectedRoutes from "./components/ProtectedRoutes";
import "./style.css";
import TestProtectedRoute2 from "./components/TestProtectedRoute2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AuthProviderRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/protected/*"
          element={
            <ProtectedRoutes>
              <Routes>
                <Route index element={<TestProtectedRoute />} />
                <Route path="test" element={<TestProtectedRoute2 />} />
              </Routes>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.VITE_BASENAME}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="*" element={<AuthProviderRoutes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
