import React from 'react';
import CustomInput from "../../UI/Input/CustomInput";
import cl from "../../Form.module.css";

const CompensationsAirForm = ({ data, handleChange, handleSubmit, companies, pollutants }) => {
        const knasOptions = [
                { label: "до 100 тис. осіб", value: 1.0 },
                { label: "100,1-250 тис. осіб", value: 1.2 },
                { label: "250,1-500 тис. осіб", value: 1.35 },
                { label: "500,1-1000 тис. осіб", value: 1.55 },
                { label: "Більше 1000 тис. осіб", value: 1.8 },
        ];

        const kfOptions = [
                { label: "Організаційно-господарські та культурно-побутові центри місцевого значення", value: 1.0 },
                { label: "Багатофункціональні центри з переважанням промислових і транспортних функцій", value: 1.25 },
                { label: "Населені пункти, природні території яких оголошено курортними", value: 1.65 },
        ];

        return (
            <div className={`${cl.container} row`}>
                    <div className="col-md-6">
                            {companies && (
                                <div className="mb-3">
                                        <label>Назва підприємства</label>
                                        <select
                                            name="company_id"
                                            value={data.company_id}
                                            onChange={handleChange}
                                            className="form-select"
                                        >
                                                <option value="">Оберіть підприємство</option>
                                                {companies.map((company) => (
                                                    <option key={company.id} value={company.id}>
                                                            {company.name}
                                                    </option>
                                                ))}
                                        </select>
                                </div>
                            )}

                            {pollutants && (
                                <div className="mb-3">
                                        <label>Забруднювач</label>
                                        <select
                                            name="pollutant_id"
                                            value={data.pollutant_id}
                                            onChange={handleChange}
                                            className="form-select"
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
                            <div>Щільність (ρ)</div>
                            <CustomInput
                                type="number"
                                name="ro"
                                value={data.ro}
                                onChange={handleChange}
                                placeholder="Введіть значення ρ"
                            />
                            <div>qmn (масова витрата)</div>
                            <CustomInput
                                type="number"
                                name="qmn"
                                value={data.qmn}
                                onChange={handleChange}
                                placeholder="Введіть значення qmn"
                            />
                            <div>qm (маса забруднення)</div>
                            <CustomInput
                                type="number"
                                name="qm"
                                value={data.qm}
                                onChange={handleChange}
                                placeholder="Введіть значення qm"
                            />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-between">
                            <div>Температура (t)</div>
                            <CustomInput
                                type="number"
                                name="t"
                                value={data.t}
                                onChange={handleChange}
                                placeholder="Введіть значення t"
                            />
                            <div>ГДК</div>
                            <CustomInput
                                type="number"
                                name="gdk"
                                value={data.gdk}
                                onChange={handleChange}
                                placeholder="Введіть значення ГДК"
                            />
                            <div>Коефіцієнт накопичення (Kнас)</div>
                            <select
                                name="Knas"
                                value={data.Knas}
                                onChange={handleChange}
                                className="form-select mb-3"
                            >
                                    <option value="">Оберіть значення</option>
                                    {knasOptions.map((option, index) => (
                                        <option key={index} value={option.value}>
                                                {option.label} ({option.value})
                                        </option>
                                    ))}
                            </select>
                            <div>Фактор забруднення (Kф)</div>
                            <select
                                name="Kf"
                                value={data.Kf}
                                onChange={handleChange}
                                className="form-select mb-3"
                            >
                                    <option value="">Оберіть значення</option>
                                    {kfOptions.map((option, index) => (
                                        <option key={index} value={option.value}>
                                                {option.label} ({option.value})
                                        </option>
                                    ))}
                            </select>
                            <div>Дата</div>
                            <CustomInput
                                type="text"
                                name="date"
                                value={data.date}
                                onChange={handleChange}
                                placeholder="Введіть дату"
                            />
                            <button className="btn btn-success m-2 align-self-end" onClick={handleSubmit}>
                                    Зберегти
                            </button>
                    </div>
            </div>
        );
};

export default CompensationsAirForm;
