import React, { useEffect, useState } from 'react';
import axios from "axios";
import CustomInput from "../../UI/Input/CustomInput";

const CalculationUpdateForm = ({ initialData, onSubmit }) => {
    const [calculation, setCalculation] = useState( {
        company: 0,
        pollutant: 0,
        date: "",
        total_emissions: ""
    });

    useEffect(() => {
        if (initialData){
            setCalculation(initialData)
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCalculation((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (initialData) {
                await axios.patch(`/calculations/${initialData.id}/`, calculation);
            }
            if (onSubmit) onSubmit();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-100">
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
                type="number"
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
                    Оновити
                </button>
            </div>
        </div>
    );
};
export default CalculationUpdateForm;
