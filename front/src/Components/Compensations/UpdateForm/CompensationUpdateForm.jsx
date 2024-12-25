import React, {useEffect, useState} from 'react';
import axios from "axios";
import CustomInput from "../../UI/Input/CustomInput";
import CompensationsWaterForm from "../Form/CompensationsWaterForm";
import CompensationsAirForm from "../Form/CompensationsAirForm";

const CompensationUpdateForm = ({onSubmit, isWater, objects, pollutants, initialData}) => {
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
        company_id: "",
        pollutant_id: ""
    });

    useEffect(() => {
        if (initialData) {
            setCompensation((prev) => ({
                ...prev,
                ...initialData,
                company_id: initialData.company.id,
                pollutant_id: initialData.pollutant.id
            }));
        }
    }, [initialData]);


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
                await axios.patch(`/compensations_water/${compensation.id}/`, compensation);
            } else {
                await axios.patch(`/compensations_air/${compensation.id}/`, compensation);
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

export default CompensationUpdateForm;
