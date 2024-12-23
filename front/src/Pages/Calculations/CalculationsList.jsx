import React, { useEffect, useState } from 'react';
import axios from "axios";
import Modal from "../../Components/UI/Modal/Modal";
import CalculationPostForm from "../../Components/Calculatioons/PostForm/CalculationPostForm";
import CalculationUpdateForm from "../../Components/Calculatioons/UpdateForm/CalculationUpdateForm";
import Filter from "../../Components/Filter/Filter";
import Loader from "../../Components/UI/Loader/Loader";
import cl from "../../Components/Form.module.css";

const CalculationsList = () => {
    const [calculations, setCalculations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [editingCalculation, setEditingCalculation] = useState(null);
    const [isWater, setIsWater] = useState(false);
    const filterOptions =
        [
            {value : 'company', name : 'Компанія'},
            {value : 'pollutant', name : 'Забруднюючі речовини'},
            {value : 'total_emissions', name : 'Загальний обсяг викидів'},
            {value : 'date', name : 'Дата'},
        ];
    const sortOptions =  [
        {value : 'company', name : 'Компанія'},
        {value : 'pollutant', name : 'Забруднюючі речовини'},
        {value : 'total_emissions', name : 'Загальний обсяг викидів'},
        {value : 'date', name : 'Дата'},
    ];

    const fetchCalculations = async ({ filterBy = '', filterValue = '', sortBy = '', sortOrder = '' } = {}) => {
        const queryParams = new URLSearchParams();

        if (filterBy && filterValue) {
            queryParams.append(filterBy, filterValue);
        }
        if (sortBy) {
            const order = sortOrder === 'desc' ? `-${sortBy}` : sortBy;
            queryParams.append('ordering', order);
        }
        try {
            setLoading(true)
            const res = await axios.get(`/calculations/?${queryParams.toString()}`);
            setCalculations(res.data)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    };

    const deleteCalculation = async (id) => {
        try {
            await axios.delete(`/calculations/${id}/`);
            fetchCalculations();
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCalculations((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchCalculations();
    }, []);

    return (
        <div className="container">
            <Filter
                fetch={fetchCalculations}
                filterOptions={filterOptions}
                sortOptions={sortOptions}
            />

            <div className="buttons-center">
                <button
                    type="button"
                    className={`btn-lg button_blue ${!isWater ? "selected_button" : ""}`}
                    onClick={() => setIsWater(false)}
                >
                    Повітря
                </button>
                <button
                    type="button"
                    className={`btn-lg button_blue ${isWater ? "selected_button" : ""}`}
                    onClick={() => setIsWater(true)}
                >
                    Вода
                </button>
            </div>

            {isWater
            ? <label className="">
                    <div className="">
                        <input
                            type="checkbox"
                            name="calculations"
                            checked={radioactiveWaste.extra_value === 1}
                            onChange={handleChange}
                        />
                        <div>Так</div>
                    </div>
                    <div className="">
                        <input
                            type="checkbox"
                            name="calculations"
                            checked={calculations.extra_value === 1.5}
                            onChange={handleChange}
                        />
                        <div>Ні</div>
                    </div>
                </label>

            :<select
                    name="type_of_pollutant"
                    value={calculations.calculation_method}
                    onChange={handleChange}
                    className="form-select" aria-label="Default select example"
                >
                    <option value="">Оберіть спосіб розрахування</option>
                    <option value="true">За розміщення відходів</option>
                    <option value="false">За викиди в атмосферне повітря</option>
                </select>

            }

            <div className="buttons-center">
                <button
                    type="button"
                    className="btn btn-primary m-2"
                    onClick={() => {
                        setModal(true);
                    }}
                >
                    Додати розрахунок
                </button>
            </div>

            <table className="table">
                <thead>
                <tr className="dark">
                    <th className="id">№</th>
                    <th className="id">ID</th>
                    <th>Компанія</th>
                    <th>Забруднююча речовина</th>
                    <th>Дата</th>
                    <th>Загальний обсяг викидів</th>
                    <th>Дії</th>
                </tr>
                </thead>
                {!loading &&
                    <tbody>
                    {calculations.map((calc, index) => (
                        <tr key={calc.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{calc.id}</td>
                            <td>{calc.company}</td>
                            <td>{calc.pollutant}</td>
                            <td>{calc.date}</td>
                            <td>{calc.total_emissions}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setEditingCalculation(calc);
                                        setUpdateModal(true);
                                    }}
                                    className="btn btn-warning btn-sm m-2"
                                >
                                    Оновити
                                </button>
                                <button
                                    onClick={() => deleteCalculation(calc.id)}
                                    className="btn btn-danger btn-sm m-2"
                                >
                                    Видалити
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                }

            </table>
            {loading &&
                <div className="loader-container">
                    <Loader/>
                </div>
            }
            <Modal visible={updateModal} setVisible={setUpdateModal}>
                <CalculationUpdateForm
                    initialData={editingCalculation}
                    onSubmit={() => {
                        setModal(false);
                        fetchCalculations();
                    }}
                />
            </Modal>
            <Modal visible={modal} setVisible={setModal}>
                <CalculationPostForm onSubmit={() => {
                    setModal(false);
                    fetchCalculations();
                }} />
            </Modal>
        </div>
    );
};

export default CalculationsList;
