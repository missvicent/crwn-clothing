import React from "react";

import { toggleCartHidden } from "./../../redux/cart/cart.actions";
import { ReactComponent as ShoppingIcon} from "./../../assets/img/shopping-bag.svg";
import { selectCartItemsCount } from "./../../redux/cart/cart.selectots"

import './cart-icon.styles.scss';

import { connect } from "react-redux";

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapSateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
});

export default connect(mapSateToProps, mapDispatchToProps)(CartIcon);