import React, {useEffect, useState} from "react";
import axios from "axios";
import CustomInput from "../../UI/Input/CustomInput";
import cl from "../../Form.module.css";

const TemporaryPlaceForm = ({temporaryPlace, handleChange, handleSubmit, objects, handleCheckboxChange}) => {


    return (
        <div className={cl.container}>
            {objects &&
                <div className="mb-2">
                    <div>Назва підприємства</div>
                    <select
                        name="company_id"
                        value={temporaryPlace.company_id}
                        onChange={handleChange}
                        className="form-select"
                        aria-label="Default select example"
                    >
                        <option value="">Оберіть компанію</option>
                        {objects.map((obj) => (
                            <option key={obj.id} value={obj.id}>
                                {obj.name}
                            </option>
                        ))}
                    </select>
                </div>
            }
            <div className="mb-2">
                <div>Оберіть категорію відходів:</div>
                <div>
                    <label className={cl.checkbox__row}>
                        <input
                            type="checkbox"
                            name="n"
                            value="632539.66"
                            checked={temporaryPlace.n === "632539.66"}
                            onChange={handleCheckboxChange}
                        />
                        Високоактивні
                    </label>
                </div>
                <div>
                    <label className={cl.checkbox__row}>
                        <input
                            type="checkbox"
                            name="n"
                            value="11807.40"
                            checked={temporaryPlace.n === "11807.40"}
                            onChange={handleCheckboxChange}
                        />
                        Середньоактивні та низькоактивні
                    </label>
                </div>
                <div>
                    <label className={cl.checkbox__row}>
                        <input
                            type="checkbox"
                            name="n"
                            value="21084.66"
                            checked={temporaryPlace.n === "21084.66"}
                            onChange={handleCheckboxChange}
                        />
                        Високоактивні відходи, представлені у вигляді джерел іонізуючого випромінювання
                    </label>
                </div>
                <div>
                    <label className={cl.checkbox__row}>
                        <input
                            type="checkbox"
                            name="n"
                            value="4216.92"
                            checked={temporaryPlace.n === "4216.92"}
                            onChange={handleCheckboxChange}
                        />
                        Середньоактивні та низькоактивні відходи, представлені у вигляді джерел іонізуючого
                        випромінювання
                    </label>
                </div>
            </div>

            <div className={cl.field}>
                <label>
                    Фактичний обсяг радіоактивних відходів, які зберігаються у виробника таких відходів поза
                    установленими особливими умовами (м³ або см³ для іонізуючого випромінювання):
                </label>
                <CustomInput
                    type="number"
                    name="v"
                    value={temporaryPlace.v}
                    onChange={handleChange}
                    placeholder="Введіть обсяг"
                />
            </div>
            <div className={cl.field}>
                <label>
                    Кількість нових календарних кварталів, протягом яких радіоактивні відходи зберігаються понад
                    установлені особливі умови ліцензії строк:
                </label>
                <CustomInput
                    type="number"
                    name="t"
                    value={temporaryPlace.t}
                    onChange={handleChange}
                    placeholder="Введіть кількість кварталів"
                />
            </div>
            <button type="button" className="btn btn-success mt-2" onClick={handleSubmit}>
                Розрахувати
            </button>
        </div>
    );
};

export default TemporaryPlaceForm;
