import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../context/auth";

const Navbar = (props) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const location = useLocation();
  const [page, setPage] = useState("");
  useEffect(() => {
    setPage(location.pathname);
  }, [location.pathname]);

  return (
    <div className="sidebar">
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link as={Link} active={page === "/" && true} to="/">
          Home
        </Nav.Link>
        {currentUser && (
          <Nav.Link
            as={Link}
            to="/scheduler"
            active={page === "/scheduler" && true}
          >
            Scheduler
          </Nav.Link>
        )}
        {currentUser && (
          <Nav.Link as={Link} to="/to-do" active={page === "/to-do" && true}>
            To Do
          </Nav.Link>
        )}
        {!currentUser && (
          <Nav.Link
            as={Link}
            to="/login"
            active={(page === "/login" || page === "/sign-up") && true}
          >
            Login
          </Nav.Link>
        )}
        {currentUser && (
          <Nav.Link
            as={Link}
            to="/"
            active={(page === "/login" || page === "/sign-up") && true}
            onClick={() => {
              setCurrentUser(false);
              localStorage.setItem("loggedIn", "");
            }}
          >
            Logout
          </Nav.Link>
        )}
      </Nav>
    </div>
  );
};
// const Navbar = withRouter(Side);
export default Navbar;