import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/LandingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./style.css";
import AuthProviderRoutes from "./utils/routes/AuthProviderRoutes";
import HeaderLayout from "./layouts/HeaderLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.VITE_BASENAME}>
        <Routes>
          <Route path="*" element={<HeaderLayout />}>
            <Route index element={<Landing />} />
            <Route path="*" element={<AuthProviderRoutes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
