import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import LoginForm from "./Components/LoginForm";

import Protecuted from "./Components/Protecuted";

import Home from "./Components/Home"

import AllProductedDetails from "./Components/AllProductedDetails"

import CartContainer from "./Components/CartContainer";

import CartView from "./Components/CartView"

import MyContext from "./Context/MyContext";

import { useState } from "react";

import "./App.css"

function App() {

  const [CartList, setCartList] = useState([])

  const addCartItems = (data) => {

    if (CartList.some((product) => product.id === data.id)){
      return alert("Product is already added in your Cart");
    }
    setCartList([...CartList, data]);
  }

  const onIncrementQuantity = (id) => {
    setCartList((prevState) => 
      prevState.map((product) => 
        product.id === id ? {...product, quantity : product.quantity + 1} : product
      )
    )
  }

  const onDecrementQuantity = (id) => {
    setCartList((prevState) => 
      prevState.map((product) => 
        product.id === id && product.quantity > 1 ? {...product, quantity : product.quantity -1} : product
      )
    )
  }

  const upDateQuantity = (id, newQuantity) => {
    setCartList((prevState) => 
    prevState.map((product) => 
      product.id === id ? {...product , quantity : newQuantity} : product
    )
    )
  }

  return (
    <MyContext.Provider value={{ setCartList, CartList, addCartItems: addCartItems, onIncrementQuantity: onIncrementQuantity, onDecrementQuantity: onDecrementQuantity, upDateQuantity: upDateQuantity }}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route element={<Protecuted />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProductedDetails />} />
            <Route path="/cart" element={<CartContainer />} />
            <Route path="/products/:id" element={<CartView />} />
          </Route>
        </Routes>
      </Router>
    </MyContext.Provider>
  )
}

export default App;