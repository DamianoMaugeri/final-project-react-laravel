import style from './HouseShowCard.module.css';
import placeHolder from '../../assets/placeholder.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser, faCalendar,  faMapMarkerAlt, faDoorOpen, faBed, faBath, faRulerCombined, faCity, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function HouseShowCard({ movieEl }) {
    // const { title, vote, number_of_rooms, number_of_beds, number_of_bathrooms, size, city, full_address, image } = movieEl;
    const { id, title, description, director, year, image , liked_by_users_count, genres  } = movieEl;
    console.log('movie el ', movieEl)

    return (
        movieEl ?
            <>
                <section className="container mt-4">

                    <div className={`card ${style.customCard}`}>
                        <div className="card-body">
                            <div className={`row ${style.dir_col}`}>
                            <div className={`col ${style.col}`}>
                                <img
                                src={`http://localhost:8000/storage/${image}`}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = placeHolder;
                                }}
                                alt={title}
                                className={style.sizeImg}
                                />
                            </div>

                            <div className="col fs-4 d-flex flex-column justify-content-center">
                                <h2 className="card-title mb-4 fst-italic fs-1 text-center">{title}</h2>
                                <ul className='d-flex flex-wrap row-gap-1 gap-3 justify-content-center '>
                                    {genres.map((genre, i) =>(
                                              <li key={i}>
                                                 <span  className ={`badge ${style.customBadge}`} >{genre.name}</span>
                                              </li>
                                    ))}

                                </ul>
                                <ul className="list-unstyled">
                                <li className="mb-2">
                                    <FontAwesomeIcon icon={faUser} className="me-2" />
                                    <strong>Regista:</strong>{' '}
                                    <span className="fst-italic fw-light">{director}</span>
                                </li>
                                <li className="mb-2">
                                    <FontAwesomeIcon icon={faCalendar} className="me-2" />
                                    <strong>Anno di uscita:</strong>{' '}
                                    <span className="fst-italic fw-light">{year}</span>
                                </li>
                                <li className="mb-2">
                                    <FontAwesomeIcon icon={faHeart} className="me-2" />
                                    <strong>Like ricevuti:</strong>{' '}
                                    <span className="fst-italic fw-light">{liked_by_users_count}</span>
                                </li>
                                </ul>

                                <div className="text-center mt-4">
                                <p className="fs-5 fw-light">{description}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                </section>
            </> :
            <div>Nessun resultato</div>
    );
}