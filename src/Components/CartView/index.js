import Header from "../Header";

import SimilarProductItem from "../SimilarProductItem"

import Cookies from "js-cookie";

import { useEffect, useState, useContext } from "react";

import MyContext from "../../Context/MyContext"

import { useParams } from "react-router-dom";

import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

import { BeatLoader } from "react-spinners"

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

function CartView() {

  const { id } = useParams();

  const [productData, setproductData] = useState([]);

  const [similarProdcut, setsimilarProduct] = useState([]);

  const [quantity , setQuantity] = useState(0);

  const [apiStatus, setapiStatus] = useState(apiStatusConstants.initial);

  const { addCartItems, onIncrementQuantity, onDecrementQuantity } = useContext(MyContext);

  const getFormattedData = (data) => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  });

  const onClickAddToCart = () => {
    if (quantity === 0) {
      alert("please Add the Quantity");
    } else {
      const newData = { ...productData, quantity };
      addCartItems(newData);
    }
  };


  const onClickIncrementQuantity = (id) => {
    onIncrementQuantity(id)
    setQuantity(prevstate => prevstate + 1);
  }

  const onClickDecrementQuantity = (id) => {
    onDecrementQuantity(id)
    setQuantity(prevstate => prevstate > 1 ? prevstate -1 : 0);
  }

  useEffect(() => {

    const getProductData = async () => {
      const jwt_Token = Cookies.get("jwtToken");
      const apiUrl = `https://apis.ccbp.in/products/${id}`;
      const options = {
        headers: {
          Authorization: `Bearer ${jwt_Token}`,
        },
        method: "GET",
      };
      const response = await fetch(apiUrl, options);
      if (response.ok === true) {
        const fetchedData = await response.json();
        const updatedData = getFormattedData(fetchedData);
        const updatedSimilarProductsData = fetchedData.similar_products.map(
          (eachSimilarProduct) => getFormattedData(eachSimilarProduct)
        );
        setproductData(updatedData);
        setsimilarProduct(updatedSimilarProductsData);
        setapiStatus(apiStatusConstants.success)
      } else {
        setapiStatus(apiStatusConstants.failure)
      }
    }

    getProductData();

  }, [id])


  const renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <button type="button" className="button">
        Continue Shopping
      </button>
    </div>
  );

  const renderProductDetailsView = () => {
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = productData;
    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{title}</h1>
            <p className="price-details">Rs {price}/-</p>
            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="reviews-count">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <div className="label-value-container">
              <p className="label">Available:</p>
              <p className="value">{availability}</p>
            </div>
            <div className="label-value-container">
              <p className="label">Brand:</p>
              <p className="value">{brand}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={() => onClickDecrementQuantity(productData.id)}
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={() => onClickIncrementQuantity(productData.id)}
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <button
              type="button"
              className="button add-to-cart-btn"
              onClick={onClickAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similarProdcut.map((eachSimilarProduct) => (
            <SimilarProductItem
              productDetails={eachSimilarProduct}
              key={eachSimilarProduct.id}
            />
          ))}
        </ul>
      </div>
    );
  }

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <BeatLoader size={30} color='#0b69ff' />
    </div>
  )

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };


  return (
    <>
      <Header />
      <div className="product-item-details-container">
        {renderProductDetails()}
      </div>
    </>
  )
}

export default CartView;