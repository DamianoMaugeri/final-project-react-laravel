import { useMatch } from "react-router-dom";
import HeartButton from "../Heart Button/HeartButton";
import style from './HouseCard.module.css'
import placeHolder from '../../assets/placeholder.png'



export default function HouseCard({ content }) {

    const { id, title, image, director, year , like} = content

    //const isOwnerPage = useMatch("/owners/:id");



    return (

        <div className={`card h-100 ${style.hover}`} >
            {/* immagine */}
            <div className="position-relative">
                <img
                    src={`http://localhost:8000/storage/${image}`}
                    onError={(e) => {
                        e.target.onerror = null; // se la immagine e innacesibile 
                        e.target.src = placeHolder; // metti il placeholder
                    }}
                    className={`card-img-top ${style.card_img}`}
                    alt="movie"
                />
                {/* Cuoricino */}
                {/* {!isOwnerPage && <HeartButton vote={vote} id={id} />} */}
                 {/* <HeartButton vote={like} id={id} /> */}
            </div>

            {/* contenuto della card */}
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{director}</p>

                    </div>
                    {/* <div>
                        <h5>{price_per_day.toString().replace('.', ',')} &#x20AC;</h5>
                        <p>giorno</p>

                    </div> */}
                </div>
                <p className="card-text">{year}</p>
            </div>
        </div>

    )
}