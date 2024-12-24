import React, {useEffect, useState} from "react";
import axios from "axios";
import RiskHealthForm from "../Form/RiskHealthForm";

const RiskHealthUpdateForm = ({ onSubmit, companies, pollutants, initialData }) => {
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

    useEffect(() => {
        if (initialData){
            setRiskHealth({...initialData, company_id: initialData.company.id, pollutant_id: initialData.pollutant.id})
        }
    }, [initialData]);

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
            await axios.patch(`/risk_health/${riskHealth.id}/`, riskHealth);
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

export default RiskHealthUpdateForm;
