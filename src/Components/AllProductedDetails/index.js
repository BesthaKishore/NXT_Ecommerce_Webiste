import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import Header from "../Header";

import PrimeDealsSection from "../PrimeDealsSection"

import ProductedCard from "../ProductedCard"

import {BsFilterRight} from 'react-icons/bs'

import { FaSearch, FaStar, FaRegStar } from "react-icons/fa";

import {BeatLoader} from "react-spinners"

import "./index.css"

const sortbyOptions = [
    {
      optionId: 'PRICE_HIGH',
      displayText: 'Price (High-Low)',
    },
    {
      optionId: 'PRICE_LOW',
      displayText: 'Price (Low-High)',
    },
  ]

  const CategoryItems = [
    {
        id: 1,
        CategoryText : "Clothing"
    },
    {
        id: 2,
        CategoryText : "Electronics"
    },
    {
        id: 3,
        CategoryText : "Appliances"
    },
    {
        id: 4,
        CategoryText : "Grocery"
    },
    {
        id: 5,
        CategoryText : "Toys"
    },
  ]

  const RatingArrya = [4, 3, 2, 1];

  const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }
   

function AllProductedDetails(){

    const [productList, setProductList] = useState([]);

    const [productApi, setProductApi] = useState(apiStatusConstants.initial);

    const [optionVlaue, setoptionVlaue] = useState(sortbyOptions[0].optionId);

    const [categoryId, setCategoryId] = useState('');

    const [RatingId, setRatingId] = useState('');

    const [searchResult, setSearchResult] = useState('');

    const onChangeSearchInput = e => {
        setSearchResult(e.target.value);
    }

    const onclickCategorySection = (each) => {
        setCategoryId(each.id);
    }

    const onclickRatingBtn = e => {
        setRatingId(e);
    }

    useEffect(() => {
        const getAllProductDetails = async () => {

            setProductApi(apiStatusConstants.inProgress);

            const apiUrl = `https://apis.ccbp.in/products?sort_by=${optionVlaue}&category=${categoryId}&title_search=${searchResult}&rating=${RatingId}`;

            const jwtToken = Cookies.get("jwtToken");

            const options = {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
              method: "GET",
            };
            const response = await fetch(apiUrl, options);
            if (response.ok === true) {
              const fetchedData = await response.json();
              const updatedData = fetchedData.products.map((product) => ({
                title: product.title,
                brand: product.brand,
                price: product.price,
                id: product.id,
                imageUrl: product.image_url,
                rating: product.rating,
              }));
              setProductApi(apiStatusConstants.success);
              setProductList(updatedData);
        }else{
            setProductApi(apiStatusConstants.failure);
        }
    }
    getAllProductDetails();
        },[optionVlaue, categoryId, searchResult, RatingId])

    const onchangeSelect = e => {
        setoptionVlaue(e.target.value);
    }

    const getFilterHeader = () => {
        return(
            <div className="Filter_header_container">
                <h1 className="Producte_heading">All Products</h1>
                <div className="sort-it-product">
                <BsFilterRight size={30}  color="#64748b"/>
                <h1 className="sort-by-heading">Sorty by</h1>
                <select className="select_container" value={optionVlaue} onChange={onchangeSelect}>
                    {sortbyOptions.map((eachOption) => (
                        <option key={eachOption.optionId} value={eachOption.optionId}>
                            {eachOption.displayText}
                        </option>
                    ))}

                </select>
                </div>
            </div>
        )
    }

    const onclickClearFilter = () => {
        setCategoryId('')
        setSearchResult('')
        setRatingId('');
    }

    const checkItSearchProductInApi = () => {
        return productList.length >= 1 ? getAllProducteds() : getNoProductView();
    }

    const getAllProducteds = () => {
        return(
            <div className="All_producte_container">
                {getFilterHeader()}
                <ul className="products-list">
                    {productList.map((product) => (
                        <ProductedCard productData={product} key={product.id} />
                    ))}
                </ul>
            </div>
        )
    }

    const getSearchAndCategoryAndRateingSection = () => {
        return(
            <div className="Search-Category-Rate-Bg-Section">
                <div className="Search_bg_container">
                    <input type="search" className="Search_items" placeholder="Search ..." value={searchResult} onChange={onChangeSearchInput}/>
                    <FaSearch size={24} color="#1e293b"/>
                </div>
                <div className="Category_section">
                    <h1 className="category_heading">Category</h1>
                    <ul className="Category_un_order">
                        {CategoryItems.map((each) => (
                            <li className={categoryId === each.id ? "category_list_items_active" : "category_list_items"}  key={each.id} onClick={() => onclickCategorySection(each)}>{each.CategoryText}</li>
                        ))}
                    </ul>
                </div>
                <div className="Category_section">
                    <h1 className="category_heading">Rating</h1>
                    <ul className="Category_un_order">
                        {RatingArrya.map((each) => (
                            <li key={`ratingId${each}`} className="star_item_container" onClick={() => onclickRatingBtn(each)}>
                                <div className="star_container">
                                {Array.from({ length: 5 }, (_, index) => (
                                    index < each ? (
                                        <FaStar key={`filled_${index}`} size={20} color="#0967d2" />
                                    ) : (
                                        <FaRegStar key={`empty_${index}`} size={20} color="#64748b" />
                                    )
                                ))}
                                </div>
                                <p className="star_content">& up</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="button" className="clear_filter_btn" onClick={onclickClearFilter}>clear filter</button>
            </div>
        )
    }

    const renderPrimeDealsFailureView = () => (
        <div className="Failure_view_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          alt="products failure"
          className="failure_view_image"
        />
        <h1 className="failure_view_heading">Oops! Something went wrong</h1>
        <p className="failure_view_para">we have some trouble processing your request. Please try agian.</p>
        </div>
      )
    
    const renderLoadingView = () => (
        <div className="products-loader-container">
          <BeatLoader size={30} color='#0b69ff'/>
        </div>
      )

      const getFetchDetails = () => {
        switch (productApi) {
            case apiStatusConstants.success:
              return checkItSearchProductInApi()
            case apiStatusConstants.failure:
              return renderPrimeDealsFailureView()
            case apiStatusConstants.inProgress:
              return renderLoadingView()
            default:
              return null
          }
      }

      const getNoProductView = () => (
            <div className="Failure_view_container">
            <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
            className="failure_view_image"
            />
            <h1 className="failure_view_heading">no product found</h1>
            <p className="failure_view_para">we could not found any products. Please try agian.</p>
            </div>
        )
      

    return(
        <div>
            <Header />
            <div className="All_producted_Bg_container">
                <PrimeDealsSection/>
                <div className="Each_product_card_container">
                    {getSearchAndCategoryAndRateingSection()}
                    {getFetchDetails()}
                </div>
            </div>
        </div>
    )
}

export default AllProductedDetails