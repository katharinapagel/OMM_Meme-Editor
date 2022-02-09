import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return <nav className="navbar bg-dark">
        <h4><Link className="link" to="/">Overview</Link></h4>
        <h4><Link className="link" to="/singleview">Single View</Link></h4>
        <h4><Link className="link" to="/editornavbar">EditorNavbar</Link></h4>
        <h4><Link className="link" to="/account">Account</Link></h4>
    </nav>

}

export default Navbar;