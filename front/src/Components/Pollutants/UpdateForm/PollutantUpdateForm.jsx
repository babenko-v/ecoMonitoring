import React, {useEffect, useState} from "react";
import axios from "axios";
import CustomInput from "../../UI/Input/CustomInput";

const PollutantUpdateForm = ({initialData, onSubmit}) => {
    const [pollutant, setPollutant] = useState({
        name: "",
        dangerous_emissions: "",
        enormity_mass_flow: "",
        permissible_emissions: "",
        type_of_pollutant: "",
        tax_rate: ""
    });

    useEffect(() => {
        if (initialData) {
            setPollutant(initialData)
        }
    }, [initialData]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPollutant((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            await axios.patch(`/pollutants/${pollutant.id}/`, pollutant);

            if (onSubmit) onSubmit();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div>Назва</div>
            <CustomInput
                type="text"
                name="name"
                value={pollutant.name}
                onChange={handleChange}
                placeholder="Назва"
            />
            <div>Небезпечні викиди</div>
            <CustomInput
                type="number"
                name="dangerous_emissions"
                value={pollutant.dangerous_emissions}
                onChange={handleChange}
                placeholder="Небезпечні викиди"
            />
            <div>Допустимі викиди</div>
            <CustomInput
                type="number"
                name="permissible_emissions"
                value={pollutant.permissible_emissions}
                onChange={handleChange}
                placeholder="Допустимі викиди"
            />
            <div>Величина масової витрати</div>
            <CustomInput
                type="number"
                name="enormity_mass_flow"
                value={pollutant.enormity_mass_flow}
                onChange={handleChange}
                placeholder="Величина масової витрати"
            />
            <div>Податок забруднювача</div>
            <CustomInput
                type="number"
                name="tax_rate"
                value={pollutant.tax_rate}
                onChange={handleChange}
                placeholder="Податок забруднювача"
            />
            <div>Тип</div>
            <select
                name="type_of_pollutant"
                value={pollutant.type_of_pollutant}
                onChange={handleChange}
                className="form-select" aria-label="Default select example"
            >
                <option value="">Оберіть тип</option>
                <option value="water">Вода</option>
                <option value="air">Повітря</option>
            </select>
            <div className="button-container">
                <button type="button" className="btn btn-success m-2" onClick={handleSubmit}>
                    Оновити
                </button>
            </div>
        </div>
    );
};

export default PollutantUpdateForm;
