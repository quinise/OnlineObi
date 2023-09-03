import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ textAlign: "center", marginTop: "20px" }}>
      <Link to="/" style={{ padding: "10px" }}>
        Home
      </Link>
      <Link to="/dashboard" style={{ padding: "10px" }}>
        Profile
      </Link>
    </nav>
  );
};
export default Navbar;