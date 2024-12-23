import React from 'react';
import cl from "../../Form.module.css";
import CustomInput from "../../UI/Input/CustomInput";

const RadioactiveWasteForm = ({radioactiveWaste, handleChange, handleSubmit, objects}) => {
    return (
        <div className={cl.container}>
            <div>Назва підприємства</div>

            <select
                name="company"
                value={radioactiveWaste.company}
                onChange={handleChange}
                className="form-select" aria-label="Default select example"
            >
                <option value="">Оберіть компанію</option>
                {objects.map((obj) => (
                    <option key={obj.id} value={obj.id}>
                        {obj.name}
                    </option>
                ))}
            </select>
            <div className={cl.form__container}>
                <div className={cl.form__column}>
                    <div>Фактичний обсяг електричної енергії (кВт·год)</div>
                    <CustomInput
                        type="number"
                        name="on_electricity"
                        value={radioactiveWaste.on_electricity}
                        onChange={handleChange}
                        placeholder="Фактичний обсяг електроенергії"
                    />
                    <div>Собівартість зберігання 1 м³ низькоактивних та середньоактивних відходів до 1 квітня 2009 року
                        (грн)
                    </div>
                    <CustomInput
                        type="number"
                        name="c1ns"
                        value={radioactiveWaste.c1ns}
                        onChange={handleChange}
                        placeholder="Введіть значення"
                    />
                    <div>Собівартість зберігання 1 м³ високoактивних відходів до 1 квітня 2009 року (грн)</div>
                    <CustomInput
                        type="number"
                        name="c2ns"
                        value={radioactiveWaste.c2ns}
                        onChange={handleChange}
                        placeholder="Введіть значення"
                    />
                    <div>Собівартість зберігання 1 м³ низькоактивних та середньоактивних відходів за базовий податковий
                        період (грн)
                    </div>
                    <CustomInput
                        type="number"
                        name="c1v"
                        value={radioactiveWaste.c1v}
                        onChange={handleChange}
                        placeholder="Введіть значення"
                    />
                    <div>Собівартість зберігання 1 м³ високoактивних відходів за базовий податковий період (грн)</div>
                    <CustomInput
                        type="number"
                        name="c2v"
                        value={radioactiveWaste.c2v}
                        onChange={handleChange}
                        placeholder="Введіть значення"
                    />
                </div>
                <div className={cl.form__column}>
                    <div>Фактичний обсяг низькоактивних та середньоактивних відходів до 1 квітня 2009 року (м³)</div>
                    <CustomInput
                        type="number"
                        name="v1ns"
                        value={radioactiveWaste.v1ns}
                        onChange={handleChange}
                        placeholder="Введіть значення"
                    />
                    <div>Фактичний обсяг високoактивних відходів до 1 квітня 2009 року (м³)</div>
                    <CustomInput
                        type="number"
                        name="v2ns"
                        value={radioactiveWaste.v2ns}
                        onChange={handleChange}
                        placeholder="Введіть значення"
                    />
                    <div>Фактичний обсяг низькоактивних та середньоактивних відходів за базовий податковий період (м³)
                    </div>
                    <CustomInput
                        type="number"
                        name="v1v"
                        value={radioactiveWaste.v1v}
                        onChange={handleChange}
                        placeholder="Введіть значення"
                    />
                    <div>Фактичний обсяг високoактивних відходів за базовий податковий період (м³)</div>
                    <CustomInput
                        type="number"
                        name="v2v"
                        value={radioactiveWaste.v2v}
                        onChange={handleChange}
                        placeholder="Введіть значення"
                    />
                    <div>Ви розраховуєте податок в період з 1 квітня 2011 до 1 квітня 2019?</div>
                    <label className={cl.checkbox__col}>
                        <div className={cl.checkbox__row}>
                            <input
                                type="checkbox"
                                name="extra_value"
                                checked={radioactiveWaste.extra_value === true}
                                onChange={handleChange}
                            />
                            <div>Так</div>
                        </div>
                        <div className={cl.checkbox__row}>
                            <input
                                type="checkbox"
                                name="extra_value"
                                checked={radioactiveWaste.extra_value === false}
                                onChange={handleChange}
                            />
                            <div>Ні</div>
                        </div>
                    </label>
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

export default RadioactiveWasteForm;