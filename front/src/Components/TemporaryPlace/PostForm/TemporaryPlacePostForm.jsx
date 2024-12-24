import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomInput from "../../UI/Input/CustomInput";
import cl from "../../Form.module.css";
import TemporaryPlaceForm from "../Form/TemporaryPlaceForm";

const TemporaryPlacePostForm = ({ onSubmit, objects }) => {
    const [temporaryPlace, setTemporaryPlace] = useState({
        n: "",
        v: "",
        t: "",
        total_tax: "",
        company: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTemporaryPlace((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        setTemporaryPlace((prevState) => ({
            ...prevState,
            n: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await axios.post("/temporary_place/", temporaryPlace);
            if (onSubmit) onSubmit();
        } catch (err) {
            console.error(err);
        }
    };

    return (
       <div>
           <TemporaryPlaceForm
               temporaryPlace={temporaryPlace} objects={objects}
               handleSubmit={handleSubmit} handleChange={handleChange}
               handleCheckboxChange={handleCheckboxChange}/>
       </div>
    );
};

export default TemporaryPlacePostForm;
