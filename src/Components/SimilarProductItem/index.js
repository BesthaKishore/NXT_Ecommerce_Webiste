import "./index.css"

function SimilarProductItem (props){
    const {imageUrl, title, brand, price, rating } = props.productDetails
    return(
        <li className="similar_product_container">
            <img src={imageUrl} className="similar_image" alt= {title} />
            <div className="similar_product_items_container">
            <h1 className="similar-name">{title}</h1>
            <p className="value">{brand}</p>
                  <div className="similar_rating-and-reviews-count">
                  <p className="price-details">Rs {price}/-</p>
                    <div className="rating-container">
                      <p className="rating">{rating}</p>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                        alt="star"
                        className="star"
                      />
                    </div>
                  </div>
            </div>
        </li>
    )
}

export default SimilarProductItem;