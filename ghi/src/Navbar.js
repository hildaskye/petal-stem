import { NavLink } from "react-router-dom";
import useToken from "./auth forms/newindex.tsx";

function Navbar({ user }) {
  const { token } = useToken();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <NavLink className="navbar-brand" to="/">
          Petal & Stem
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/gardens">
                    Community Page
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/pest/add">
                    Add a pest
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/pest/list">
                    Pest List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/species/add">
                    Add a plant species
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/species">
                    Species List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/garden/${user.id}`}>
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/garden/${user.id}/plant/add`}>
                    Add a Plant
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/search">
                    Search
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
