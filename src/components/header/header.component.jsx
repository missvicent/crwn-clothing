import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import "./header.styles.scss";
import {ReactComponent as Logo} from "./../../assets/img/crown.svg";
import { setCurrentUser } from './../../redux/user/user.actions';
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDownComponent from "../cart-dropdown/cart.dropdwon";
import { selectCartHidden } from "./../../redux/cart/cart.selectots"
import { selectCurrentUser } from "./../../redux/user/user.selectots"



const Header = ({ currentUser, userSignOut, hidden }) => {

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
            currentUser === null ? <Link to="/login" className="option">Sign In</Link> :
            <div className="option" onClick={userSignOut}>SIGN OUT</div> 
        }
        </div>
        <div className="options">
            <CartIcon />
        </div>
        {
            hidden ? null :  <CartDropDownComponent />
        }
    </div>);
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Header);