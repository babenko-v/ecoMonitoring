import React, {useEffect} from 'react';
import CustomInput from "../../UI/Input/CustomInput";

const CalculationForm = ({calculation, handleChange, handleSubmit, objects, pollutants, isWater}) => {
    useEffect(() => {
        console.log(calculation)
    }, [calculation]);
    return (
        <div>
            {calculation.calculation_method == "true" && !isWater &&
                <div className="waste-location-form">
                    <div className="mb-2">
                        <div className="mb-1 color-green">Оберіть Кт(Коефіцієнт, який враховує розташування місця
                            розміщення відходів)
                        </div>
                        <label className="checkbox-row">
                            <input
                                type="checkbox"
                                name="k1"
                                value="3"
                                checked={calculation.k1 === "3"}
                                onChange={handleChange}
                            />
                            Коефіцієнт 3 (розміщення відходів у межах населеного пункту або на відстані менше як 3 км
                            від таких меж)
                        </label>
                        <label className="checkbox-row">
                            <input
                                type="checkbox"
                                name="k1"
                                value="1"
                                checked={calculation.k1 === "1"}
                                onChange={handleChange}
                            />
                            Коефіцієнт 1 (розміщення відходів на відстані від 3 км і більше від меж населеного пункту)
                        </label>
                    </div>

                    <div className="mb-2">
                        <div className="mb-1 color-green">Оберіть Ко(Відходи розміщені на звалищах, які не забезпечують
                            повного виключення забруднення атмосферного повітря або водних об'єктів?)
                        </div>
                        <label className="checkbox-row">
                            <input
                                type="checkbox"
                                name="k2"
                                value="3"
                                checked={calculation.k2 === "3"}
                                onChange={handleChange}
                            />
                            Так
                        </label>
                        <label className="checkbox-row">
                            <input
                                type="checkbox"
                                name="k2"
                                value="1"
                                checked={calculation.k2 === "1"}
                                onChange={handleChange}
                            />
                            Ні
                        </label>
                    </div>
                </div>
            }


            {isWater &&
                <label className="checkbox-col">
                    <div>Оберіть коефіцієнт:</div>
                    <div>
                        <div className="checkbox-row">
                            <input
                                type="checkbox"
                                name="ratio_water"
                                value="1.5"
                                checked={calculation.ratio_water === "1.5"}
                                onChange={handleChange}
                            />
                            <div>Коефіцієнт 1.5(Застосовується у разі скидання забруднюючих пречовин у стави та озера)
                            </div>
                        </div>
                        <div className="checkbox-row">
                            <input
                                type="checkbox"
                                name="ratio_water"
                                value="1"
                                checked={calculation.ratio_water === "1"}
                                onChange={handleChange}
                            />
                            <div>Коефіцієнт 1(Застосовується у інших випадках)</div>
                        </div>
                    </div>
                </label>}
            <div>Компанія</div>
            <select
                name="company_id"
                value={calculation.company_id || ""}
                onChange={handleChange}
                className="form-select mb-2"
            >
                <option value="" disabled>Оберіть компанію</option>
                {objects.map((company) => (
                    <option key={company.id} value={company.id}>
                        {company.name}
                    </option>
                ))}
            </select>

            <div>Забруднююча речовина</div>
            <select
                name="pollutant_id"
                value={calculation.pollutant_id || ""}
                onChange={handleChange}
                className="form-select mb-2"
            >
                <option value="" disabled>Оберіть речовину</option>
                {pollutants.map((pollutant) => (
                    <option key={pollutant.id} value={pollutant.id}>
                        {pollutant.name}
                    </option>
                ))}
            </select>

            <div>Дата</div>
            <CustomInput
                type="number"
                name="date"
                value={calculation.date || ""}
                onChange={handleChange}
                placeholder="Дата"
            />

            <div>Загальний обсяг викидів</div>
            <CustomInput
                type="number"
                name="total_emissions"
                value={calculation.total_emissions || ""}
                onChange={handleChange}
                placeholder="Загальний обсяг викидів"
            />

            <div className="button-container">
                <button type="button" className="btn btn-success m-2" onClick={handleSubmit}>
                    Зберегти
                </button>
            </div>
        </div>
    );
};

export default CalculationForm;