import React, {Component} from 'react';
import Card from "./Card";
import './styles/cards.css';
import ProductContext from './proContext';

class Cards extends Component {
	state = {  } 
	render() { 
		return (
			<ProductContext.Consumer>
				{(([data, AddToCart, Increase, Decrease, CartQuan, cart]) => 
				(
					<div className="cards">
					{data? data.map((each, id) => (
						<Card 
							key={id}
							id={id}
							name={each.name}
							category={each.category}
							price={each.price}
							image={window.innerWidth < 630 ? each.image.mobile: each.image.desktop}
							AddToCart={AddToCart}
							Increase={Increase}
							Decrease={Decrease}
							CartQuan={CartQuan}
							cart={cart}
						/>
					)): null}
				</div>
				))}
			</ProductContext.Consumer>
		);
	}
}
 
export default Cards;