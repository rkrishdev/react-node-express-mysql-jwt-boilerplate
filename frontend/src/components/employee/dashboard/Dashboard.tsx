import { useLogout } from "../../../utils/hooks/useLogout";

const Dashboard = () => {
  const logout = useLogout();
  return (
    <main>
      <div>Dashboard</div>
      <button type="button" className="btn" onClick={logout}>
        Logout
      </button>
    </main>
  );
};

export default Dashboard;
