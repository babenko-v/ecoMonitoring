import React, { useState } from 'react';
import axios from "axios";
import CustomInput from "../../UI/Input/CustomInput";

const ObjectPostForm = ({ onSubmit }) => {
    const [object, setObject] = useState({
        name: "",
        head: "",
        address: "",
        economic_activity: "",
        ownership: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setObject((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            console.log(object)
            await axios.post("/objects/", object);
            if (onSubmit) onSubmit();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div>Компанія</div>
            <CustomInput
                type="text"
                name="name"
                value={object.name}
                onChange={handleChange}
                placeholder="Компанія"
            />
            <div>Керівник</div>
            <CustomInput
                type="text"
                name="head"
                value={object.head}
                onChange={handleChange}
                placeholder="Керівник"
            />
            <div>Адреса</div>
            <CustomInput
                type="text"
                name="address"
                value={object.address}
                onChange={handleChange}
                placeholder="Адреса"
            />
            <div>Економічна активність</div>
            <CustomInput
                type="text"
                name="economic_activity"
                value={object.economic_activity}
                onChange={handleChange}
                placeholder="Економічна активність"
            />
            <div>Форма власності</div>
            <CustomInput
                type="text"
                name="ownership"
                value={object.ownership}
                onChange={handleChange}
                placeholder="Форма власності"
            />
            <div className="button-container">
                <button type="button" className="btn btn-success m-2" onClick={handleSubmit}>
                    Зберегти
                </button>
            </div>
        </div>
    );
};

export default ObjectPostForm;
