import GlobalContext from "../../context/GlobalContext"
import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import HouseCard from "../HouseCard/HouseCard"
import { Link, useSearchParams, useLocation } from "react-router-dom"
import Loader from "../Loader/Loader"
import CardCarousel from "../CardCarousel/Card carousel"

export default function HouseList() {


     // const { houses, setHouses, searchedCity, fetchHouses } = useContext(GlobalContext)
    const { movies,  recommended ,recent , setMovies, searchedTitle, fetchMovies } = useContext(GlobalContext);

    const location = useLocation();





    // useEffect(() => {
    //     fetchHouses()
    // }, []);

    useEffect(() => {

        const searchParams = new URLSearchParams(location.search);
        const queryParams = {};

        for (const key of searchParams.keys()) {
            const values = searchParams.getAll(key); // Ottieni tutti i valori della chiave

            if (values.length > 1) {
                queryParams[key] = values.map(value => (isNaN(value) ? value : Number(value)));
            } else {
                const value = values[0];
                if (value && value !== "null") {
                    queryParams[key] = isNaN(value) ? value : Number(value);
                }
            }
        }
        console.log("Parametri della query:", queryParams);
        fetchMovies(queryParams)

    }, [location.search]);





    return (


        !movies ? (<Loader />) : movies.length > 0 ?

        

            (<div className="container">
                <div className="row">
                    <h2>consigliati :</h2>
                    <CardCarousel content={recommended}/>
                </div>
                         <div className="row">
                            <h2>
                                nuove uscite :
                            </h2>
                    <CardCarousel content={recent}/>
                </div>
                <div className="row d-flex flex-wrap row-gap-5 pb-5">
                    <h2 className="mt-5">tutti i film:</h2>
                    {movies.map((movie, i) => (
                        <div key={i} className="col-lg-4 col-md-6 col-xs-12">
                            {/* <Link className="text-decoration-none text-dark" to={`/${house.title.replace(/ /g, '-')}`} >
                                <HouseCard content={house} />
                            </Link> */}
                            {/* <Link className="text-decoration-none text-dark" to={`/${movie.title.replace(/ /g, '-')}`} >
                                <HouseCard content={movie} />
                            </Link> */}

                            <Link className="text-decoration-none text-dark" to={`/${movie.id}`} >
                                <HouseCard content={movie} />
                            </Link>


                        </div>
                    ))}
                </div>
            </div>) :
            (<h1 className="text-center">La ricerca non ha prodotto risultati</h1>)



    )
}