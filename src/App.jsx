import React from "react";
import { useState, useEffect } from "react";
import "./styles/App.css";
import Cards from "./cards";
import Cart from "./cart";
import EmpthyCart from "./empthyCart";
import ProductContext from "./proContext";
import OrderConfirmed from "./orderConfirmed";
function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isConfirm, setConfirm] = useState(false);
  const [cart, setCart] = useState(null);

  //Fetches the data from data.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/productListsWithCart/data.json");
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response wasn't ok!");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error.message);
        setError(error);
      }
    };
    fetchData();
  }, []);

  // Adds to cart when cart = null
  function AddToCart(id) {
    const newCaOb = {
      id: id,
      image: data[id].image.thumbnail,
      name: data[id].name,
      price: data[id].price,
      quantity: 1,
    };

    let exists;
    let found;

    //if cart is not empthy
    if (cart) {
      exists = cart.find((each) => newCaOb.id === each.id);
      found = exists !== undefined;
    }

    if (!cart) {
      setCart([newCaOb]);
    } else if (!found) {
      // If the item does not exist in the cart, add it
      setCart((prevCart) => [...prevCart, newCaOb]);
    } else {
      // If the item exists in the cart, update its quantity
      setCart((prevCart) =>
        prevCart.map((each) =>
          each.id === exists.id
            ? { ...each, quantity: each.quantity + 1 }
            : each
        )
      );
    }
    handleBtnSwitches(id);
  }
  // Activates increase and decrease button
  function handleBtnSwitches(id) {
    const corresAddBtn = document.getElementById(`addBtn${id}`);
    const corresInDeBtn = document.getElementById(`increase-decrease-btn${id}`);
    const corresCaImg = document.getElementById(`proImg${id}`);

    corresAddBtn.setAttribute("aria-selected", "true");
    corresInDeBtn.setAttribute("aria-selected", "true");
    corresCaImg.setAttribute("aria-selected", "true");
  }

  // kills increase and decrease button when the item is 0
  function unhandleBtnWitches(id) {
    const corresAddBtn = document.getElementById(`addBtn${id}`);
    const corresInDeBtn = document.getElementById(`increase-decrease-btn${id}`);
    const corresCaImg = document.getElementById(`proImg${id}`);

    corresAddBtn.setAttribute("aria-selected", "false");
    corresInDeBtn.setAttribute("aria-selected", "false");
    corresCaImg.setAttribute("aria-selected", "false");
  }

  //Increases the the item quantity
  function Increase(id) {
    setCart((prevCart) =>
      prevCart.map((each) =>
        each.id === id ? { ...each, quantity: each.quantity + 1 } : each
      )
    );
  }

  // decrease the item
  function Decrease(id) {
    cart.map((eachItem) => {
      if (eachItem.id === id && eachItem.quantity > 1) {
        setCart((preCart) =>
          preCart.map((each) =>
            each.id === id ? { ...each, quantity: each.quantity - 1 } : each
          )
        );
      } else if (eachItem.quantity === 1 && eachItem.id === id) {
        setCart((preCart) => preCart.filter((eachFil) => eachFil.id !== id));
        unhandleBtnWitches(id);
      }
    });
  }

  //Displays the item quantity between increase and decrease btn
  function CartQuan(id) {
    let quan;
    if (cart) {
      cart.map((each) => {
        each.id === id ? (quan = each.quantity) : each;
      });
    } else {
      quan = 1;
    }
    return quan;
  }
  //Displays total cart price
  function totalCartItemPrice() {
    let totalCartQuanPrice = 0;
    cart.map((eachItem) => {
      totalCartQuanPrice += eachItem.price * eachItem.quantity;
    });
    return totalCartQuanPrice.toFixed(2);
  }
  //Displays total cart quantity
  function totalCartItem() {
    let totalCartItem = 0;
    cart.map((eachItem) => {
      totalCartItem += eachItem.quantity;
    });
    return totalCartItem;
  }

  //Deletes from cart
  function DeleteFromCart(id) {
    cart.map((eachDel) => {
      if (eachDel.id === id && eachDel.quantity > 1) {
        setCart((preCart) =>
          preCart.map((eachItem) =>
            eachItem.id === id
              ? { ...eachItem, quantity: eachItem.quantity - 1 }
              : eachItem
          )
        );
      } else if (eachDel.id === id && eachDel.quantity === 1) {
        setCart((preCart) => preCart.filter((eachFil) => eachFil.id !== id));
        //returns the corresponding card to initial stage if quan is 0
        unhandleBtnWitches(id);
      }
    });
  }

  // shows final cart
  function confirmOrder() {
    setConfirm(true);
  }

  function newOrder() {
    window.location.reload();
  }

  return (
    <ProductContext.Provider
      value={[
        data,
        AddToCart,
        Increase,
        Decrease,
        CartQuan,
        totalCartItem,
        totalCartItemPrice,
        DeleteFromCart,
        confirmOrder,
        newOrder,
        cart,
      ]}
    >
      {error ? (
        <h1>{error.message}</h1>
      ) : (
        <div className="main-container">
          <Cards />
          <Cart />
          {isConfirm ? <OrderConfirmed /> : ""}
        </div>
      )}
    </ProductContext.Provider>
  );
}

export default App;
