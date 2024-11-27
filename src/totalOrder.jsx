import React, { Component } from "react";
import './styles/totalOrder.css'

class TotalOrder extends Component {
	state = {  } 
	render() { 
		console.log("Total order component")
		return (
			<div className="total-order-cont">
				<p className="total-order-text">
					Total order
				</p>
				<span className="total-order-price">
					${this.props.totalCartItemPrice()}
				</span>
			</div>
		);
	}
}
 
export default TotalOrder;