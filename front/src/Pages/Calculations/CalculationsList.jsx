import React, { useEffect, useState } from 'react';
import axios from "axios";
import Modal from "../../Components/UI/Modal/Modal";
import CalculationPostForm from "../../Components/Calculatioons/PostForm/CalculationPostForm";
import CalculationFilter from "../../Components/Calculatioons/CalculationFilter/CalculationFilter";
import CalculationUpdateForm from "../../Components/Calculatioons/UpdateForm/CalculationUpdateForm";
const CalculationsList = () => {
    const [calculations, setCalculations] = useState([]);
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [editingCalculation, setEditingCalculation] = useState(null);

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
            const res = await axios.get(`/calculations/?${queryParams.toString()}`);
            setCalculations(res.data)
        } catch (err) {
            console.error(err);
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

    useEffect(() => {
        fetchCalculations();
    }, []);

    return (
        <div>
            <CalculationFilter fetch={fetchCalculations}/>
            <table className="table">
                <thead>
                <tr className="dark">
                    <th>#</th>
                    <th>Company</th>
                    <th>Pollutant</th>
                    <th>Date</th>
                    <th>Total Emissions</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {calculations.map((calc, index) => (
                    <tr key={calc.id}>
                        <th scope="row">{index + 1}</th>
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
                                Update
                            </button>
                            <button
                                onClick={() => deleteCalculation(calc.id)}
                                className="btn btn-danger btn-sm m-2"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="button-container">
                <button
                    type="button"
                    className="btn btn-primary m-2"
                    onClick={() => {
                        setModal(true);
                    }}
                >
                    Add Calculation
                </button>
            </div>
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