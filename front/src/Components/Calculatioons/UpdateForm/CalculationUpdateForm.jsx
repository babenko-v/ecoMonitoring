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
                await axios.put(`/calculations/${initialData.id}/`, calculation);
            } else {
                await axios.post("/calculations/", calculation);
            }
            if (onSubmit) onSubmit();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <CustomInput
                type="text"
                name="company"
                value={calculation.company}
                onChange={handleChange}
                placeholder="Company"
            />
            <CustomInput
                type="text"
                name="pollutant"
                value={calculation.pollutant}
                onChange={handleChange}
                placeholder="Pollutant"
            />
            <CustomInput
                type="date"
                name="date"
                value={calculation.date}
                onChange={handleChange}
                placeholder="Date"
            />
            <CustomInput
                type="number"
                name="total_emissions"
                value={calculation.total_emissions}
                onChange={handleChange}
                placeholder="Total Emissions"
            />
            <div className="button-container">
                <button type="button" className="btn btn-success m-2" onClick={handleSubmit}>
                    {initialData ? "Update" : "Save"}
                </button>
            </div>
        </div>
    );
};
export default CalculationUpdateForm;
