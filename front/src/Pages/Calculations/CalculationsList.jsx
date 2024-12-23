import React, {useEffect, useState} from 'react';
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
    const [calculationData, setCalculationData] = useState({
        ratio_water: "1",
        company_id: '',
        pollutant_id: '',
        date: '',
        total_emissions: '',
        calculation_method: "false",
    });

    const [isWater, setIsWater] = useState(false);
    const filterOptions =
        [
            {value: 'company_id', name: 'Компанія'},
            {value: 'pollutant_id', name: 'Забруднюючі речовини'},
            {value: 'total_emissions', name: 'Загальний обсяг викидів'},
            {value: 'date', name: 'Дата'},
        ];
    const sortOptions = [
        {value: 'company_id', name: 'Компанія'},
        {value: 'pollutant_id', name: 'Забруднюючі речовини'},
        {value: 'total_emissions', name: 'Загальний обсяг викидів'},
        {value: 'date', name: 'Дата'},
    ];

    const fetchCalculations = async ({filterBy = '', filterValue = '', sortBy = '', sortOrder = ''} = {}) => {
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
            if (isWater) {
                const res = await axios.get(`/calculations_water/?${queryParams.toString()}`);
                setCalculations(res.data.calculations)
            } else {
                const res = await axios.get(`/calculations_air/?${queryParams.toString()}`);
                setCalculations(res.data.calculations)
            }
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
        console.log(value)
        setCalculationData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchCalculations();
    }, [isWater]);

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
                    className={`btn-lg ${!isWater ? "button_outline" : "button_filled"}`}
                    onClick={() => setIsWater(false)}
                >
                    Повітря
                </button>
                <button
                    type="button"
                    className={`btn-lg ${isWater ? "button_outline" : "button_filled"}`}
                    onClick={() => setIsWater(true)}
                >
                    Вода
                </button>
            </div>

            {!isWater &&
                <select
                    name="calculation_method"
                    value={calculationData.calculation_method}
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
                    <th>Загальний податок</th>
                    <th>Дії</th>
                </tr>
                </thead>
                {!loading &&
                    <tbody>
                    {calculations.map((calc, index) => (
                        <tr key={calc.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{calc.id}</td>
                            <td>{calc.company.name}</td>
                            <td>{calc.pollutant.name}</td>
                            <td>{calc.date}</td>
                            <td>{calc.total_emissions}</td>
                            <td>{calc.total_tax}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setCalculationData({...calculationData, ...calc});
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
                    initialData={calculationData}
                    isWater={isWater}
                    onSubmit={() => {
                        setUpdateModal(false);
                        fetchCalculations();
                    }}
                />
            </Modal>
            <Modal visible={modal} setVisible={setModal}>
                <CalculationPostForm
                    initialData={calculationData}
                    isWater={isWater}
                    onSubmit={() => {
                        setModal(false);
                        fetchCalculations();
                    }}
                />
            </Modal>
        </div>
    );
};

export default CalculationsList;
