import React from "react";
import { Component } from "react";
import './styles/cartItem.css'
import { CartQuanContext } from "./proContext";

class CartItem extends Component {
	state = {  } 
	render() { 
		return (
				<li className="cart-item">
				<span className="item-info">
					<p className="name">
						{this.props.name}
					</p>
					<div className="price-quantity">
						<p className="quantity">
							{this.props.quantity}x
						</p>
						<p className="price">
							@${(this.props.price).toFixed(2)}
						</p>

						<p className="total-price">
							${(this.props.price * this.props.quantity).toFixed(2)}
						</p>

					</div>
				</span>

				<button 
				className="delete-item"
				onClick={() => this.props.DeleteFromCart(this.props.id)}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
					<path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
					</svg>
				</button>
			</li>
		);
	}
}
 
export default CartItem;