import React, {useEffect, useState} from "react";
import axios from "axios";
import CustomInput from "../../UI/Input/CustomInput";
import cl from '../../Form.module.css';
import RadioactiveWasteForm from "../Form/RadioactiveWasteForm";

const RadioactiveWastePostForm = ({onSubmit}) => {
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

    const [objects, setObjects] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchObjects = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/objects/`);
            setObjects(res.data)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchObjects()
    }, []);


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
            await axios.post("/radioactive_waste/", radioactiveWaste);
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

export default RadioactiveWastePostForm;
