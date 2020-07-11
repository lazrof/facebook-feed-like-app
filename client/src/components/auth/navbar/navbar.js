import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import './navbar.scss';

const Navbar = () => {

    return(
        <>
        <nav>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
        </>
    )
}

export default Navbar;