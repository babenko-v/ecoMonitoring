import React, { useState } from "react";
import axios from "axios";
import RiskHealthForm from "../Form/RiskHealthForm";

const RiskHealthPostForm = ({ onSubmit, companies, pollutants }) => {
    const [riskHealth, setRiskHealth] = useState({
        company_id: "",
        pollutant_id: "",
        concentration: "",
        sf: "",
        rfc: "",
        date: "",
        hq: "",
        ladd: "",
        cr: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRiskHealth((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            console.log(riskHealth);
            await axios.post("/risk_health/", riskHealth);
            if (onSubmit) onSubmit();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <RiskHealthForm
                riskHealth={riskHealth}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                companies={companies}
                pollutants={pollutants}
            />
        </div>
    );
};

export default RiskHealthPostForm;
