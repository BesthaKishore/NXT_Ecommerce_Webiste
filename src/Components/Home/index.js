import { Link } from "react-router-dom"

import Header from "../Header";

import "./index.css"

function Home(){
    return(
        <>
            <Header/>
            <main className="Home_main_container">
                <section className="Section_contaienr">
                    <h1 className="Section_heading">clothes that get you <br/>noticed</h1>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png" className="Mobile_figure_image" alt="clothes that get you noticed"/>
                    <p className="section_para">
                        Fashion is part of the daily air and it does not quite help that it changes
                        all the time. Clothes have always been a marker of the era and we are in a revolution. Your fashion makes
                        you been seen and heard that way you are. So, celebrate the seasons new and exciting fashion in your own way.
                    </p>
                    <Link to= "/products" className="Link">
                        <button type="button" className="shopeNow_btn">Shope Now</button>
                    </Link>
                </section>
                <figure className="figure_container">
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png" className="figure_image" alt="clothes that get you noticed"/>
                </figure>
            </main>
        </>
    )
}

export default Home;