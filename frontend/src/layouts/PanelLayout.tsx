import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Sidebar from "../components/shared/Sidebar";
import MainWrapper from "../components/shared/MainWrapper";
import Navbar from "../components/shared/Navbar";

const PanelLayout = () => {
  return (
    <>
      <MainWrapper>
        <Sidebar />
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Navbar />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexGrow: "1",
              padding: "2.5rem 2.5rem 0 2.5rem",
            }}
          >
            <Outlet />
            <Footer />
          </div>
        </div>
      </MainWrapper>
    </>
  );
};

export default PanelLayout;
