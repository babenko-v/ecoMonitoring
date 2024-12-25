import React from "react";
import CustomInput from "../../UI/Input/CustomInput";
import cl from "../../Form.module.css";

const CompensationsWaterForm = ({ data, handleChange, handleSubmit, companies, pollutants }) => {
    const categories = [
        { label: "Господарсько-побутового використання", value: 1.5 },
        { label: "Для цілей рибного господарства", value: 2.5 },
        { label: "Питного використання", value: 3.0 },
        { label: "Внутрішні морські води, територіальне море", value: 3.5 },
        { label: "Природно-заповідного фонду", value: 4.5 },
        { label: "Підземні води", value: 5.0 },
    ];

    const regions = [
        { label: "Закарпатська", value: 1.0 },
        { label: "Івано-Франківська", value: 1.05 },
        { label: "Чернівецька", value: 1.06 },
        { label: "Тернопільська", value: 1.07 },
        { label: "Волинська", value: 1.1 },
        { label: "Житомирська", value: 1.1 },
        { label: "Львівська", value: 1.1 },
        { label: "Сумська", value: 1.1 },
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

                <div>Коефіцієнт Y — ступінь розчинності речовини у воді</div>
                <CustomInput
                    type="number"
                    name="Y"
                    value={data.Y}
                    onChange={handleChange}
                    placeholder="Введіть значення Y"
                />
                <div>CiD (концентрація на вході)</div>
                <CustomInput
                    type="number"
                    name="CiD"
                    value={data.CiD}
                    onChange={handleChange}
                    placeholder="Введіть значення CiD"
                />
                <div>CiF (концентрація на виході)</div>
                <CustomInput
                    type="number"
                    name="CiF"
                    value={data.CiF}
                    onChange={handleChange}
                    placeholder="Введіть значення CiF"
                />
                <div>QIf (якість води)</div>
                <CustomInput
                    type="number"
                    name="QIf"
                    value={data.QIf}
                    onChange={handleChange}
                    placeholder="Введіть значення QIf"
                />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-between">
                <div>
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
                    <div>Коефіцієнт каталітичної активності (Kкат)</div>
                    <select
                        name="Kkat"
                        value={data.Kkat}
                        onChange={handleChange}
                        className="form-select mb-3"
                        aria-label="Default select example"
                    >
                        <option value="" disabled>
                            Виберіть категорію
                        </option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.value}>
                                {category.label} ({category.value})
                            </option>
                        ))}
                    </select>

                    <div>Коефіцієнт ризику (Kr)</div>
                    <select
                        name="Kr"
                        value={data.Kr}
                        onChange={handleChange}
                        className="form-select mb-3"
                        aria-label="Default select example"
                    >
                        <option value="" disabled>
                            Виберіть регіон
                        </option>
                        {regions.map((region, index) => (
                            <option key={index} value={region.value}>
                                {region.label} ({region.value})
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
                </div>
                <button className="btn btn-success mt-3 align-self-end" onClick={handleSubmit}>
                    Зберегти
                </button>
            </div>
        </div>
    );
};

export default CompensationsWaterForm;
