import { Link , useNavigate} from "react-router-dom"

import { useContext } from "react";

import MyContext from "../../Context/MyContext";

import Cookies from "js-cookie"

import "./index.css"

function Header(){

    const navigation = useNavigate();

    const { CartList } = useContext(MyContext);

    const onclickLogoutbtn = () => {
        Cookies.remove("jwtToken");
        navigation("/login");
    }


    return(
        <header className = "header_bg_container">
            <nav className="navigation_container">
                <Link to= "/" className="Link">
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="website logo" className="Header_logo"/> 
                </Link>
                <div className = "Dasktop_nav_un_order_container">
                    <ul className="nav_un_order_container">
                        <Link to= "/" className="Link">
                            <li className ="Home">Home</li>
                        </Link>
                        <Link to= "/products" className="Link">
                            <li className ="Home">Product</li>
                        </Link>
                        <Link to= "/cart" className="Link">
                            <li className ="Home">Cart <span className="cart_len">{CartList.length > 0 ? CartList.length : ""}</span></li>
                        </Link>
                    </ul>
                    <button type ="button" className="logout_btn" onClick={onclickLogoutbtn}>Logout</button>
                </div>
                <button type="button" className="Mb_logout_btn" onClick={onclickLogoutbtn}>
                    <img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png" alt ="nav logout" className="Mb_logout"/>
                </button>
            </nav>
            <div className = "Mobile_navigation_container">
                <Link to= "/" className="Link">
                    <img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png" alt ="nav home" className="navigation_image"/>
                </Link>
                <Link to= "/products" className="Link">
                    <img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png" alt ="nav products" className="navigation_image"/>
                </Link>
                <Link to= "/cart" className="Link">
                    <img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png" alt ="nav cart" className="navigation_image"/>
                    <span className="cart_len">{CartList.length > 0 ? CartList.length : ""}</span>
                </Link>
            </div>
        </header>
    )
}

export default Header;