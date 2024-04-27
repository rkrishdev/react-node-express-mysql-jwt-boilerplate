import { Link } from "react-router-dom";
import Header from "../shared/Header";

const HomePage = () => {
  return (
    <>
      <Header />
      <main
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Landing page</h1>

        <Link className="btn" to={"/admin/login"}>Login Page</Link>
      </main>
    </>
  );
};

export default HomePage;
