import React, { useState } from 'react';
import axios from "axios";
import CustomInput from "../../UI/Input/CustomInput";

const CalculationPostForm = ({ onSubmit }) => {
    const [calculation, setCalculation] = useState({
        company: null,
        pollutant: null,
        date: "",
        total_emissions: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCalculation((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            await axios.post("/calculations/", calculation);
            if (onSubmit) onSubmit();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div>Компанія</div>
            <CustomInput
                type="number"
                name="company"
                value={calculation.company}
                onChange={handleChange}
                placeholder="Компанія"
            />
            <div>Забруднююча речовина</div>
            <CustomInput
                type="number"
                name="pollutant"
                value={calculation.pollutant}
                onChange={handleChange}
                placeholder="Забруднююча речовина"
            />
            <div>Дата</div>
            <CustomInput
                type="date"
                name="date"
                value={calculation.date}
                onChange={handleChange}
                placeholder="Дата"
            />
            <div>Загальний обсяг викидів</div>
            <CustomInput
                type="number"
                name="total_emissions"
                value={calculation.total_emissions}
                onChange={handleChange}
                placeholder="Загальний обсяг викидів"
            />
            <div className="button-container">
                <button type="button" className="btn btn-success m-2" onClick={handleSubmit}>
                    Зберегти
                </button>
            </div>
        </div>
    );
};

export default CalculationPostForm;
