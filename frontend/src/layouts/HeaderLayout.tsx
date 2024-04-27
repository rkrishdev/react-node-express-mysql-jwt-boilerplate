import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";

const HeaderLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HeaderLayout;
