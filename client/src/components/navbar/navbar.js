import React from 'react';
import { connect } from "react-redux";
import { logOut } from '../../redux/actions/user/actions';
import { Link } from "react-router-dom";
import './navbar.scss';

const Navbar = (props) => {

    const handleLogOut = (e) => {
        e.preventDefault();
        props.logOut();
    }

    const NavbarLinks = () => {

        if(props.isAuthenticated){
            return (
                <>
                <a onClick={handleLogOut}>Log Out</a>
                </>
            );
        } else {
            return(
                <>
                <Link to="/">Login</Link>
                <Link to="/register">Register</Link>
                </>
            )
        }
    }

    return(
        <>
        <nav className={props.isFixed ? 'fixed' : ''}>
            <NavbarLinks />
        </nav>
        </>
    )
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.userReducer.authenticated,
    };
  }
  
const mapDispatchToProps = {
    logOut,
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(Navbar);