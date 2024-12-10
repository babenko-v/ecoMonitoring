import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomInput from "../../UI/Input/CustomInput";

const PollutantUpdateForm = ({ initialData, onSubmit }) => {
    const [pollutant, setPollutant] = useState({
        name: "",
        dangerous_emissions: "",
        enormity_mass_flow: "",
        permissible_emissions: ""
    });

    useEffect(() => {
        if (initialData){
            setPollutant(initialData)
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPollutant((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (initialData) {
                await axios.put(`/pollutants/${initialData.id}/`, pollutant);
            } else {
                await axios.post("/pollutants/", pollutant);
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
                name="name"
                value={pollutant.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <CustomInput
                type="number"
                name="dangerous_emissions"
                value={pollutant.dangerous_emissions}
                onChange={handleChange}
                placeholder="Dangerous Emissions"
            />
            <CustomInput
                type="number"
                name="enormity_mass_flow"
                value={pollutant.enormity_mass_flow}
                onChange={handleChange}
                placeholder="Enormity Mass Flow"
            />
            <CustomInput
                type="number"
                name="permissible_emissions"
                value={pollutant.permissible_emissions}
                onChange={handleChange}
                placeholder="Permissible Emissions"
            />
            <div className="button-container">
                <button type="button" className="btn btn-success m-2" onClick={handleSubmit}>
                    {initialData ? "Update" : "Save"}
                </button>
            </div>
        </div>
    );
};

export default PollutantUpdateForm;
