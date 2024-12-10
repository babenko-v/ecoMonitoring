import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomInput from "../../UI/Input/CustomInput";

const ObjectUpdateForm = ({ initialData, onSubmit }) => {
    const [object, setObject] = useState( {
        name: "",
        head: "",
        address: "",
        economic_activity: "",
        ownership: ""
    });

    useEffect(() => {
        if (initialData){
            setObject(initialData)
        }
    }, [initialData]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setObject((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (initialData) {
                await axios.put(`/objects/${initialData.id}/`, object);
            } else {
                await axios.post("/objects/", object);
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
                value={object.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <CustomInput
                type="text"
                name="head"
                value={object.head}
                onChange={handleChange}
                placeholder="Head"
            />
            <CustomInput
                type="text"
                name="address"
                value={object.address}
                onChange={handleChange}
                placeholder="Address"
            />
            <CustomInput
                type="text"
                name="economic_activity"
                value={object.economic_activity}
                onChange={handleChange}
                placeholder="Economic Activity"
            />
            <CustomInput
                type="text"
                name="ownership"
                value={object.ownership}
                onChange={handleChange}
                placeholder="Ownership"
            />
            <div className="button-container">
                <button type="button" className="btn btn-success m-2" onClick={handleSubmit}>
                    {initialData ? "Update" : "Save"}
                </button>
            </div>
        </div>
    );
};

export default ObjectUpdateForm;
