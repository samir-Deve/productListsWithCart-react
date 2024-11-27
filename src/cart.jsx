import React, { Component } from "react";
import "./styles/cart.css";
import CartItem from "./cartItem";
import TotalOrder from "./totalOrder";
import CarbonNeutral from "./carbonNeutral";
import ConfirmOrder from "./confirmBtn";
import EmpthyCart from "./empthyCart";
import ProductContext from "./proContext";
/* 
class Cart extends Component {
  state = {};

  render() {
    return (
          <ProductContext.Consumer>
            {([data, AddToCart,Increase,Decrease,DisplayCartQuan,totalCartItem, totalCartItemPrice, cart]) => {
            <div className="cart">
            <h2 className="cart-header">Your Cart</h2>
            <ol>
              if (cart && cart.length > 0) {
                return cart.map((item, id) => (
									<CartItem 
									key={id} 
									name={item.name}
									price={item.price}
									quantity={item.quantity}
									/>
                ));
              } else {
                return <li>No items in cart</li>;
              }
            }}
            </ol>
            <TotalOrder />
            <CarbonNeutral />
            <ConfirmOrder />
          </div>
          </ProductContext.Consumer>
    );
  }
}

export default Cart;
 */
class Cart extends Component {  
  state = {};  

  render() {  
    return (  
      <ProductContext.Consumer>  
        {([data, AddToCart, Increase, Decrease, DisplayCartQuan, totalCartItem, totalCartItemPrice,DeleteFromCart,confirmOrder,newOrder, cart]) => (  
          cart? (
            <div className="cart">  
            <h2 className="cart-header">Your Cart({totalCartItem()})</h2>  
            <ol>  
              { 
                cart.map((item) => (  
                  <CartItem   
                    key={item.id}
                    id={item.id} 
                    name={item.name}  
                    price={item.price}  
                    quantity={item.quantity}
                    DeleteFromCart={DeleteFromCart} 
                  />  
                ))  
              }  
            </ol>  
            <TotalOrder totalCartItemPrice={totalCartItemPrice}/>  
            <CarbonNeutral />  
            <ConfirmOrder />  
          </div>
          ):(
            <EmpthyCart />
          )
        )}  
      </ProductContext.Consumer>  
    );  
  }  
}  

export default Cart;  