import React, {useEffect, useState} from 'react';
import axios from "axios";
import CustomInput from "../../UI/Input/CustomInput";
import CalculationForm from "../From/CalculationForm";

const CalculationPostForm = ({onSubmit, initialData, isWater, objects, pollutants}) => {
    const [calculation, setCalculation] = useState({
        ratio_water: "1",
        company_id: '',
        pollutant_id: '',
        date: '',
        total_emissions: '',
        calculation_method: "false",
        k1 : "",
        k2 : ""
    });

    useEffect(() => {
        if (initialData) {
            setCalculation((prev) => ({
                ...prev,
                calculation_method : initialData.calculation_method ? initialData.calculation_method : ""
            }));
        }
    }, [initialData]);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setCalculation((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            if (isWater) {
                await axios.post("/calculations_water/", calculation);
            } else {
                console.log(calculation)
                await axios.post("/calculations_air/", calculation);
            }

            if (onSubmit) onSubmit();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <CalculationForm handleSubmit={handleSubmit} handleChange={handleChange}
                             calculation={calculation} objects={objects}
                             pollutants={pollutants}
                             isWater={isWater}
            />
        </div>
    );
};

export default CalculationPostForm;
