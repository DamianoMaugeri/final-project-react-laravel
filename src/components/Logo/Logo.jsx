import LogoBoolBnb from "../../assets/logowhite.png";
import { Link } from 'react-router-dom';
import style from "./Logo.module.css";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

export default function Logo() {
    const { setSearchedCity, fetchHouses, filters, setFilters, setSearchParams, setSelectedSize, setSelectedPrice, setSelectedRoomNumbers, setSelectedBeds, setSelectedBathrooms } = useContext(GlobalContext);
    return (
        <div className={style.logoContainer}>
            <Link
                to="/"
                onClick={() => {
                    setSearchedCity("");
                    //fetchHouses();
                    setFilters({
                        title:''

                    });

                }}
            >
                <img className={style.logoImage} src={LogoBoolBnb} alt="Logo Boolbnb" />
            </Link>
        </div>
    );
}
