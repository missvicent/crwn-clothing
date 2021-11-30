import React from "react";

import { signOutGoogle } from './../../firebase/firebase.utils';
import { Link } from "react-router-dom";

import "./header.styles.scss";
import {ReactComponent as Logo} from "./../../assets/img/crown.svg";



const Header = ({ currentUser }) => {

    const signOut = () => {
        console.log(1)
        signOutGoogle();
        console.log(currentUser)
    }

    return (<div className="header">
        <Link to="/" className="logo-container">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link to="/shop" className="option">SHOP</Link>
        </div>
        <div className="options">
            <Link to="/shop" className="option">Contact</Link>
        </div>
        <div className="options">
        {
            currentUser !== null ? <div className="option" onClick={signOut}>SIGN OUT</div> : 
            <Link to="/login" className="option">Sign In</Link>
        }
        </div>
    </div>);
}

export default Header;