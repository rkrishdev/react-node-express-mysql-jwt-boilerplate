import { Link } from "react-router-dom";

const TestProtectedRoute2 = () => {
  return (
    <div>
      <p>TestProtectedRoute2</p>
      <Link className="btn" to={"/protected"}>To test route 1</Link>
    </div>
  );
};

export default TestProtectedRoute2;
