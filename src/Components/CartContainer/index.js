import { useContext, useState, useEffect } from "react";

import MyContext from "../../Context/MyContext";

import Header from "../Header";

import { Link } from "react-router-dom";

import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

import { IoMdCloseCircle } from "react-icons/io";

import "./index.css"

function CartContainer() {

    const { CartList, upDateQuantity, setCartList} = useContext(MyContext);

    const [Balance, setBalance] = useState(0);

    const showEmptycardview = () => {
        return (
            <div className="emptycard_view_container">
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png" alt="cart" className="no_cart_image" />
                <h1 className="emptyCard_heading">Your Cart is Empty!</h1>
                <Link to="/products">
                    <button type="button" className="shop_now">Shop Now</button>
                </Link>
            </div>
        )
    }

    useEffect(() => {
        const result = CartList.reduce((acc, items) => acc + items.price * items.quantity, 0);
        setBalance(result);
    },[CartList])

    const onclickIncrement = (id) => {
        const cuurrentItems = CartList.find((each) => each.id === id);
        upDateQuantity(id, cuurrentItems.quantity + 1);
    };

    const onclickDecrement = (id) => {
        const cuurrentItems = CartList.find((each) => each.id === id);
        if (cuurrentItems.quantity > 1){
            upDateQuantity(id, cuurrentItems.quantity -1);
        }
    }
    
    const OnclickRemoveEachItems = (id) => {
        const RemoveEach = CartList.filter(each => each.id !== id);
        setCartList(RemoveEach);
    }

    const RemoveAllItemsInCart = () => {
        setCartList([]);
    }

    const showAddcartview = () => {
        const CartLen = CartList.length;
        return (
            <ul className="Show_Un_order_data" >
                <div className="Show_add_cart_view_container" >
                    <h1 className="show_add_cart_view_heading">My Cart</h1>
                    <button type="button" className="Remove_all" onClick={RemoveAllItemsInCart}>Remove All</button>
                    {CartList.map((each) => (
                        <div className="Show_data_bg_container" key={each.id}>
                            <img src={each.imageUrl} alt={each.title} className="show_data_image" />
                            <div className="Show_data_card_container">
                                <div className="show_data_details">
                                    <h1 className="show_data_heading">{each.title}</h1>
                                    <p className="show_data_brand">by {each.brand}</p>
                                </div>
                                <div className="quantity-container">
                                    <button
                                        type="button"
                                        className="quantity-controller-button"
                                        onClick={() => onclickDecrement(each.id)}
                                    >
                                        <BsDashSquare className="quantity-controller-icon" />
                                    </button>
                                    <p className="quantity">{each.quantity}</p>
                                    <button
                                        type="button"
                                        className="quantity-controller-button"
                                        onClick={() => onclickIncrement(each.id)}
                                    >
                                        <BsPlusSquare className="quantity-controller-icon" />
                                    </button>
                                </div>
                                <div className="PriceAndRemoveContainer">
                                    <p className="Show_data_price">Rs {each.price}/-</p>
                                    <button type="button" className="Desktop_remove_btn" onClick={() => OnclickRemoveEachItems(each.id)}>
                                        <IoMdCloseCircle size={24} />
                                    </button>
                                    <button type="button" className="Mobile_remove_btn" onClick={() => OnclickRemoveEachItems(each.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                        ))}
                    <div className="Balance_check_container">
                        <h1 className="Balance_heading">Order Total: <span className="span_bal">Rs {Balance}/-</span></h1>
                        <p className="cart_length"><span className="span_bal">{CartLen}</span> items in cart</p>
                        <button type="button" className="check_it">Checkout</button>
                    </div>
                </div>
            </ul >
        )
    }


    return (
        <div>
            <Header />
            <div className="cart_items_container">
                {CartList.length !== 0 ? showAddcartview() : showEmptycardview()}
            </div>
        </div>
    )
}

export default CartContainer;