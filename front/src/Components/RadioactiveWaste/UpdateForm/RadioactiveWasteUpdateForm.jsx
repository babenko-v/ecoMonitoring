import React, {useEffect, useState} from "react";
import axios from "axios";
import CustomInput from "../../UI/Input/CustomInput";
import cl from '../../Form.module.css';
import RadioactiveWasteForm from "../Form/RadioactiveWasteForm";

const RadioactiveWasteUpdateForm = ({onSubmit, initialData, objects}) => {
    const [radioactiveWaste, setRadioactiveWaste] = useState({
        on_electricity: "",
        c1ns: "",
        c2ns: "",
        c1v: "",
        c2v: "",
        v1ns: "",
        v2ns: "",
        v1v: "",
        v2v: "",
        total_tax: "",
        company: "",
        extra_value: false,
    });

    useEffect(() => {
        if (initialData){
            setRadioactiveWaste({...initialData, extra_value: false, company_id: initialData.company.id})
        }
    }, [initialData]);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setRadioactiveWaste((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async () => {
        try {
            console.log(radioactiveWaste);
            await axios.patch(`/radioactive_waste/${radioactiveWaste.id}/`, radioactiveWaste);
            if (onSubmit) onSubmit();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <RadioactiveWasteForm radioactiveWaste={radioactiveWaste} handleChange={handleChange} handleSubmit={handleSubmit} objects={objects}/>
        </div>
    );
};

export default RadioactiveWasteUpdateForm;
