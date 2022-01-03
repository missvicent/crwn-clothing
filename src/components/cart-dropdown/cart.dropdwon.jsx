import React from "react";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectCartItems } from "./../../redux/cart/cart.selectots"
import CustomButton from '../custom-button/custom-button.component';
import CartItem from "../cart-item/cart-item.component";

import './cart-dropdown.styles.scss';

const CartDropDownComponent = (cartItems) => {

    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate(`checkout`);
    }

   return( <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ?
                cartItems.cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
                : <span>Your Cart is empty</span>
            }
            <CustomButton onClick={goToCheckout}>Go to checkout</CustomButton>
        </div>
    </div>);
};

const mapsStateToProps = (state) => ({
    cartItems: selectCartItems(state)
});

export default connect(mapsStateToProps)(CartDropDownComponent);