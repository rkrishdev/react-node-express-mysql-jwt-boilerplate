import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import routes from "../../utils/routes/routes";

const Header = () => {
  const location = useLocation();
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    const route = routes[location.pathname];
    setTitle(route || "YT");
  }, [location.pathname]);

  useEffect(() => {
    document.title = title;
  }, [title]);
  return <></>;
};

export default Header;
