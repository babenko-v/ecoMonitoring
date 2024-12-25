import React, {useEffect, useState} from 'react';
import axios from "axios";
import CustomInput from "../../UI/Input/CustomInput";
import CompensationsWaterForm from "../Form/CompensationsWaterForm";
import CompensationsAirForm from "../Form/CompensationsAirForm";

const CompensationPostForm = ({onSubmit, isWater, objects, pollutants}) => {
    const [compensation, setCompensation] = useState({
        Y: "",
        CiD: "",
        CiF: "",
        QIf: "",
        t: "",
        gdk: "",
        Kkat: "",
        Kr: "",
        Yi: "",
        m: "",
        A: "",
        total: "",
        date: "",
        ro: "",
        qmn: "",
        qm: "",
        Knas: "",
        Kf: "",
        Kt: "",
        Kzi: "",
    });



    const handleChange = (e) => {
        const {name, value} = e.target;

        setCompensation((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            if (isWater) {
                await axios.post("/compensations_water/", compensation);
            } else {
                await axios.post("/compensations_air/", compensation);
            }

            if (onSubmit) onSubmit();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {isWater
            ? <CompensationsWaterForm
                    pollutants={pollutants}
                    companies={objects}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    data={compensation}
                />
            : <CompensationsAirForm  pollutants={pollutants}
                                     companies={objects}
                                     handleChange={handleChange}
                                     handleSubmit={handleSubmit}
                                     data={compensation}
                />
            }
        </div>
    );
};

export default CompensationPostForm;
