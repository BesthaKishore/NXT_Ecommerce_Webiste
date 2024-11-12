import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import ProductedCard from '../ProductedCard'

import {BeatLoader} from "react-spinners"


import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
 
function PrimeDealsSection(){

    const [primeDeals, setprimeDeals] = useState([])

    const [apiStatus, setapiStatus] = useState(apiStatusConstants.initial)

    const renderPrimeDealsList = () => {
        return (
          <div>
            <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
            <ul className="products-list">
              {primeDeals.map(product => (
                <ProductedCard productData={product} key={product.id} />
              ))}
            </ul>
          </div>
        )
      }
    
    const renderPrimeDealsFailureView = () => (
        <img
          src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
          alt="Register Prime"
          className="register-prime-image"
        />
      )
    
    const renderLoadingView = () => (
        <div className="products-loader-container">
          <BeatLoader size={30} color='#0b69ff'/>
        </div>
      )

      useEffect(() => {
        const getPrimeDeals = async () => {

            setapiStatus(apiStatusConstants.inProgress)

            const jwt_Token = Cookies.get('jwtToken')
        
            const apiUrl = 'https://apis.ccbp.in/prime-deals'
            const options = {
              headers: {
                Authorization: `Bearer ${jwt_Token}`,
              },
              method: 'GET',
            }
            const response = await fetch(apiUrl, options)
            if (response.ok === true) {
              const fetchedData = await response.json()
              const updatedData = fetchedData.prime_deals.map(product => ({
                title: product.title,
                brand: product.brand,
                price: product.price,
                id: product.id,
                imageUrl: product.image_url,
                rating: product.rating,
              }))
                setprimeDeals(updatedData)
                setapiStatus(apiStatusConstants.success)
            }
            if (response.status === 401) {
                setapiStatus(apiStatusConstants.failure)
            }
          }
        

        getPrimeDeals();
      },[])

      const getFetchDetails = () => {
        switch (apiStatus) {
            case apiStatusConstants.success:
              return renderPrimeDealsList()
            case apiStatusConstants.failure:
              return renderPrimeDealsFailureView()
            case apiStatusConstants.inProgress:
              return renderLoadingView()
            default:
              return null
          }
      }
    

    return(
        <>
         {getFetchDetails()}
        </>
    )
}

export default PrimeDealsSection
