import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../Components/UI/Modal/Modal";
import PollutantUpdateForm from "../../Components/Pollutants/UpdateForm/PollutantUpdateForm";
import PollutantPostForm from "../../Components/Pollutants/PostForm/PollutantPostForm";
import PollutantFilter from "../../Components/Pollutants/PollutantsFilter/PollutantsFilter";

const PollutantsList = () => {
    const [pollutants, setPollutants] = useState([]);
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [editingPollutant, setEditingPollutant] = useState(null);

    const fetchPollutants = async ({ filterBy = '', filterValue = '', sortBy = '', sortOrder = '' } = {}) => {
        const queryParams = new URLSearchParams();

        if (filterBy && filterValue) {
            queryParams.append(filterBy, filterValue);
        }
        if (sortBy) {
            const order = sortOrder === 'desc' ? `-${sortBy}` : sortBy;
            queryParams.append('ordering', order);
        }
        try {
            const res = await axios.get(`/pollutants/?${queryParams.toString()}`);
            setPollutants(res.data)
        } catch (err) {
            console.error(err);
        }
    };

    const deletePollutant = async (id) => {
        try {
            await axios.delete(`/pollutants/${id}/`);
            fetchPollutants();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPollutants();
    }, []);

    return (
        <div>
            <PollutantFilter fetch={fetchPollutants}/>
            <table className="table">
                <thead>
                <tr className="dark">
                    <th>#</th>
                    <th>Name</th>
                    <th>Dangerous Emissions</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {pollutants.map((pollutant, index) => (
                    <tr key={pollutant.id}>
                        <td>{index + 1}</td>
                        <td>{pollutant.name}</td>
                        <td>{pollutant.dangerous_emissions}</td>
                        <td>
                            <button
                                onClick={() => {
                                    setEditingPollutant(pollutant);
                                    setUpdateModal(true);
                                }}
                                className="btn btn-warning btn-sm m-2"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => deletePollutant(pollutant.id)}
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
                        setEditingPollutant(null);
                        setModal(true);
                    }}
                >
                    Add Pollutant
                </button>
            </div>
            <Modal visible={updateModal} setVisible={setUpdateModal}>
                <PollutantUpdateForm
                    initialData={editingPollutant}
                    onSubmit={() => {
                        setUpdateModal(false);
                        fetchPollutants();
                    }}
                />
            </Modal>
            <Modal visible={modal} setVisible={setModal}>
                <PollutantPostForm onSubmit={() => {
                    setModal(false);
                    fetchPollutants();
                }} />
            </Modal>
        </div>
    );
};

export default PollutantsList;
