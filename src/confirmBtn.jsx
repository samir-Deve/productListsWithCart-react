import React, {Component} from 'react';
import './styles/confirmOrder.css'
import ProductContext from './proContext';
class ConfirmOrder extends Component {
	state = {  } 
	render() { 
		return (
			<ProductContext.Consumer>
				{
					([data, AddToCart, Increase, Decrease, DisplayCartQuan, totalCartItem, totalCartItemPrice,DeleteFromCart,confirmOrder,newOrder, cart]) => (
						<button 
							className="confirm-order-btn"
							onClick={() => confirmOrder()}
						>
							Confirm Order
						</button>
					)
				}
			</ProductContext.Consumer>
		);
	}
}
 
export default ConfirmOrder;