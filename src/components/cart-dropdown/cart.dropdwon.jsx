import React from "react";

import { connect } from "react-redux";
import CustomButton from '../custom-button/custom-button.component';
import CartItem from "../cart-item/cart-item.component";

import './cart-dropdown.styles.scss';


const CartDropDownComponent = ({cartItems}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                console.log(cartItems),
                cartItems.cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
            }
            <CustomButton>Go to checkout</CustomButton>
        </div>
    </div>
);

const mapsStateToProps = ({cart: cartItems}) => ({
    cartItems
});

export default connect(mapsStateToProps)(CartDropDownComponent);