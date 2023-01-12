import React from "react";

import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Sight Words
        </NavLink>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav">
            <Link className="nav-link" to="/lists">
              Lists
            </Link>
            <Link className="nav-link" to="/settings">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
