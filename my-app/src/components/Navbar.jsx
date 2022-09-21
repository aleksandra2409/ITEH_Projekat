import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar(props) {
  let navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="navbar">
      <div
        className={
          location.pathname === "/" ? "navbar__row active" : "navbar__row"
        }
        onClick={() => navigate("/")}
      >
        Movies
      </div>
      <div
        className={
          location.pathname === "/genres" ? "navbar__row active" : "navbar__row"
        }
        onClick={() => navigate("/genres")}
      >
        Genres
      </div>
      <div
        className={
          location.pathname === "/producers"
            ? "navbar__row active"
            : "navbar__row"
        }
        onClick={() => navigate("/producers")}
      >
        Producers
      </div>
      <div className="navbar__row" onClick={props.handleLogout}>
        Logout
      </div>
    </div>
  );
}
