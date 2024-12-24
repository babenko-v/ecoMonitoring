import React from 'react';
import cl from "../../Form.module.css";
import CustomInput from "../../UI/Input/CustomInput";

const RiskHealthForm = ({ riskHealth, handleChange, handleSubmit, companies, pollutants }) => {
    return (
        <div className={cl.container}>
            {companies && (
                <div>
                    <div>Назва підприємства</div>
                    <select
                        name="company_id"
                        value={riskHealth.company_id}
                        onChange={handleChange}
                        className="form-select" aria-label="Default select example"
                    >
                        <option value="">Оберіть компанію</option>
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {pollutants && (
                <div>
                    <div>Забруднювач</div>
                    <select
                        name="pollutant_id"
                        value={riskHealth.pollutant_id}
                        onChange={handleChange}
                        className="form-select" aria-label="Default select example"
                    >
                        <option value="">Оберіть забруднювач</option>
                        {pollutants.map((pollutant) => (
                            <option key={pollutant.id} value={pollutant.id}>
                                {pollutant.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className={cl.form__container}>
                <div className={cl.form__column}>
                    <div>Концентрація</div>
                    <CustomInput
                        type="number"
                        name="concentration"
                        value={riskHealth.concentration}
                        onChange={handleChange}
                        placeholder="Введіть концентрацію"
                    />
                    <div>SF (фактор небезпеки)</div>
                    <CustomInput
                        type="number"
                        name="sf"
                        value={riskHealth.sf}
                        onChange={handleChange}
                        placeholder="Введіть значення SF"
                    />
                    <div>RFC (рівень безпечної концентрації)</div>
                    <CustomInput
                        type="number"
                        name="rfc"
                        value={riskHealth.rfc}
                        onChange={handleChange}
                        placeholder="Введіть значення RFC"
                    />
                    <div>Дата</div>
                    <CustomInput
                        type="number"
                        name="date"
                        value={riskHealth.date}
                        onChange={handleChange}
                        placeholder="Введіть дату"
                    />
                </div>
            </div>

            <div className={cl.form__footer}>
                <button
                    type="button"
                    className="btn btn-success m-2"
                    onClick={handleSubmit}
                >
                    Зберегти
                </button>
            </div>
        </div>
    );
};

export default RiskHealthForm;
