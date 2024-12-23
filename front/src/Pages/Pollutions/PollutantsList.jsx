import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../Components/UI/Modal/Modal";
import PollutantUpdateForm from "../../Components/Pollutants/UpdateForm/PollutantUpdateForm";
import PollutantPostForm from "../../Components/Pollutants/PostForm/PollutantPostForm";
import Filter from "../../Components/Filter/Filter";
import Loader from "../../Components/UI/Loader/Loader";

const PollutantsList = () => {
    const [pollutants, setPollutants] = useState([]);
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editingPollutant, setEditingPollutant] = useState(null);

    const filterOptions =
        [
            {value : 'name', name : 'Назва'},
            {value : 'dangerous_emissions', name : 'Небезпечні викиди'},
            {value : 'permissible_emissions', name : 'Допустимі викиди'},
        ];
    const sortOptions = [
        {value : 'name', name : 'Назва'},
        {value : 'dangerous_emissions', name : 'Небезпечні викиди'},
        {value : 'permissible_emissions', name : 'Допустимі викиди'},
    ];

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
            console.log(id)
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
                    <th className="id">№</th>
                    <th className="id">ID</th>
                    <th className="name">Назва</th>
                    <th>Небезпечні викиди</th>
                    <th>Допустимі викиди мг/м^3</th>
                    <th>Величина массової витрати г/год</th>
                    <th>Податок забруднювача</th>
                    <th>Тип</th>
                    <th>Дії</th>
                </tr>
                </thead>
                {!loading &&
                    <tbody>
                    {pollutants.map((pollutant, index) => (
                        <tr key={pollutant.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{pollutant.id}</td>
                            <td>{pollutant.name}</td>
                            <td>{pollutant.dangerous_emissions}</td>
                            <td>{pollutant.permissible_emissions}</td>
                            <td>{pollutant.enormity_mass_flow}</td>
                            <td>{pollutant.tax_rate}</td>
                            <td>{pollutant.type_of_pollutant}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setEditingPollutant(pollutant);
                                        setUpdateModal(true);
                                    }}
                                    className="btn btn-warning btn-sm m-2"
                                >
                                    Оновити
                                </button>
                                <button
                                    onClick={() => deletePollutant(pollutant.id)}
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
            <div className="button-container">
                <button
                    type="button"
                    className="btn btn-primary m-2"
                    onClick={() => {
                        setEditingPollutant(null);
                        setModal(true);
                    }}
                >
                    Додати забруднювач
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
