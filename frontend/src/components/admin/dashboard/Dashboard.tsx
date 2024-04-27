import { Link } from "react-router-dom";
import { useLogout } from "../../../utils/hooks/useLogout";
import { TextField, Typography } from "@mui/material";

const Dashboard = () => {
  const logout = useLogout();
  return (
    <main>
      <div>Dashboard</div>
      <div>
        <Typography variant="h3">Test</Typography>
        <Typography variant="body1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, cum!
          Voluptate sequi perspiciatis id totam consectetur, qui recusandae,
          amet accusantium, culpa quod exercitationem? Nisi, rerum?
        </Typography>
        <br />
        <TextField type="text" name="test" label="Outlined" color="error" />
      </div>
      <Link className="btn" to={"/admin/test"}>Test Route</Link>
      <button type="button" className="btn" onClick={logout}>
        Logout
      </button>
    </main>
  );
};

export default Dashboard;
