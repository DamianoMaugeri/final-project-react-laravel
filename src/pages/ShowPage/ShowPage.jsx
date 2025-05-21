import HouseShowCard from "../../components/House Show Card/HouseShowCard";
import ReviewCard from "../../components/Review Card/ReviewCard";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./ShowPage.module.css";
import Loader from "../../components/Loader/Loader";
//import EmailForm from "../../components/emailForm/emailForm";
import HeaderMain from "../../components/HeaderMain/HeaderMain";
//import RentForm from "../../components/RentForm/RentForm";

export default function ShowPage() {
    // const [house, setHouse] = useState(null);
    // const [reviewBoolean, setReviewBoolean] = useState(false);
    // const [emailBoolean, setEmailBoolean] = useState(false);
    // const [rentBoolean, setRentBoolean] = useState(false);
    // const { slug } = useParams();

     const { id} = useParams();
     const [movie, setMovie] = useState(null);
     const [reviewBoolean, setReviewBoolean] = useState(false);




    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/movies/${id}`)
            .then(res => setMovie(res.data.data))
            .catch(err => console.error(err));
    }, [id]);

    return (
        <div className={`d-flex flex-column flex-grow-1 mt-5 pt-5 ${style.showPageContainer}`}>
            <HeaderMain />
            {movie ? (
                <>
                    <HouseShowCard movieEl={movie} />

{/* 
                    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-5 mt-5">


                        <button
                            className={`${style.btn} ${reviewBoolean ? style['btn-active'] : ''}`}
                            onClick={() => {
                                setReviewBoolean(!reviewBoolean);
                            }}>
                            Lascia una recensione
                        </button>
                    </div> */}


                    {/* {reviewBoolean && <ReviewForm id={movie.id} />} */}


                    <hr />
                     <ReviewCard reviews={movie.reviews} /> 
                </>
            ) : (
                <div className="d-flex align-items-center justify-content-center flex-grow-1">
                    <Loader />
                </div>
            )}
        </div>
    );
}
