import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">

            <Link to="/" className="navbar-brand">Contact Book</Link>

            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/list">Items List</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/add">New Item</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;