import React, {useEffect, useState} from 'react';
import axios from "axios";
import Modal from "../../Components/UI/Modal/Modal";
import Filter from "../../Components/Filter/Filter";
import Loader from "../../Components/UI/Loader/Loader";
import cl from "../../Components/Form.module.css";
import CompensationsWaterList from "../../Components/Compensations/List/CompensationsWaterList";
import CompensationsAirList from "../../Components/Compensations/List/CompensationsAirList";

const CompensationsList = () => {

    const [isWater, setIsWater] = useState(false);




    return (
        <div className="container">
            <div className="title">Збитки</div>
            <div className="buttons-center">
                <button
                    type="button"
                    className={`btn-lg ${!isWater ? "button" : "button__pressed"}`}
                    onClick={() => setIsWater(false)}
                >
                    Повітря
                </button>
                <button
                    type="button"
                    className={`btn-lg ${isWater ? "button" : "button__pressed"}`}
                    onClick={() => setIsWater(true)}
                >
                    Вода
                </button>
            </div>
            {isWater
                ? <CompensationsWaterList/>
                : <CompensationsAirList/>
            }

        </div>
    );
};

export default CompensationsList;
