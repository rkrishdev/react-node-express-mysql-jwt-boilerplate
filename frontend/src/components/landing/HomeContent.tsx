import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <h1 className="text-center mb-10 font-bold font-sans text-3xl">
        Landing page
      </h1>

      <Link to={"/login"} className="btn mb-5">
        Login Page
      </Link>
    </main>
  );
};

export default HomePage;
