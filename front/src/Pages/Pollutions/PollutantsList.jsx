import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../Components/UI/Modal/Modal";
import PollutantUpdateForm from "../../Components/Pollutants/UpdateForm/PollutantUpdateForm";
import PollutantPostForm from "../../Components/Pollutants/PostForm/PollutantPostForm";
import PollutantFilter from "../../Components/Pollutants/PollutantsFilter/PollutantsFilter";
import Filter from "../../Components/Filter/Filter";
import Loader from "../../Components/UI/Loader/Loader";

const PollutantsList = () => {
    const [pollutants, setPollutants] = useState([]);
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editingPollutant, setEditingPollutant] = useState(null);
    const filterOptions = ['name', 'dangerous_emissions', 'permissible_emissions'];
    const sortOptions = ['name', 'dangerous_emissions', 'permissible_emissions'];

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
            setLoading(true)
            const res = await axios.get(`/pollutants/?${queryParams.toString()}`);
            setPollutants(res.data)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
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
        <div className="container">
            <Filter
                fetch={fetchPollutants}
                filterOptions={filterOptions}
                sortOptions={sortOptions}
            />
            <table className="table">
                <thead>
                <tr className="dark">
                    <th className="id">ID</th>
                    <th>Name</th>
                    <th>Dangerous Emissions</th>
                    <th>Actions</th>
                </tr>
                </thead>
                {!loading &&
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
                }

            </table>
            {loading &&
                <div className="loader-container">
                    <Loader/>
                </div>
            }
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
