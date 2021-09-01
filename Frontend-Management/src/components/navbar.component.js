import React from 'react';
import {Link} from 'react-router-dom';

function Navbar () {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link to="#" className="navbar-brand">Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                </li>
                <li className="nav-item">
                <Link to="#" className="nav-link" >parkingSpots</Link>
                </li>
                <li className="nav-item">
                <Link to="/login" className="nav-link" >User Login</Link>
                </li>
                <li className="nav-item">
                <Link to="/add" className="nav-link" >User Registration</Link>
                </li>
                <li className="nav-item">
                <Link to="/all"className="nav-link" >All Users</Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
}

export default Navbar;