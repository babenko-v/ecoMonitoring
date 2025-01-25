import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../../Filter/Filter";
import Loader from "../../UI/Loader/Loader";
import Modal from "../../UI/Modal/Modal";
import CompensationUpdateForm from "../UpdateForm/CompensationUpdateForm";
import CompensationPostForm from "../PostForm/CompensationPostForm";


const CompensationsAirList = () => {
    const [compensations, setCompensations] = useState([]);
    const [objects, setObjects] = useState()
    const [pollutants, setPollutants] = useState()
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editingCompensation, setEditingCompensation] = useState(null);

    const filterOptions = [
        { value: "company", name: "Компанія" },
        { value: "pollutant", name: "Забруднювач" },
        { value: "ro", name: "Ро" },
        { value: "qmn", name: "Qmin" },
        { value: "qm", name: "Qm" },
        { value: "t", name: "Температура" },
        { value: "gdk", name: "ГДК" },
        { value: "Knas", name: "Кнас" },
        { value: "Kf", name: "Кф" },
        { value: "Kt", name: "Кт" },
        { value: "m", name: "Маса" },
        { value: "Kzi", name: "Кзі" },
        { value: "A", name: "A" },
        { value: "total", name: "Загальна сума" },
        { value: "date", name: "Дата" },
    ];

    const sortOptions = [...filterOptions];

    const fetchCompensations = async ({ filterBy = "", filterValue = "", sortBy = "", sortOrder = "" } = {}) => {
        const queryParams = new URLSearchParams();

        if (filterBy && filterValue) {
            queryParams.append(filterBy, filterValue);
        }
        if (sortBy) {
            const order = sortOrder === "desc" ? `-${sortBy}` : sortBy;
            queryParams.append("ordering", order);
        }
        try {
            setLoading(true);
            const res = await axios.get(`/compensations_air/?${queryParams.toString()}`);
            setCompensations(res.data.compensation_air);
            setObjects(res.data.objects);
            setPollutants(res.data.pollutants);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteCompensation = async (id) => {
        try {
            await axios.delete(`/compensations_air/${id}/`);
            fetchCompensations();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCompensations();
    }, []);

    return (
        <div>
            <Filter fetch={fetchCompensations} filterOptions={filterOptions} sortOptions={sortOptions} />
            <table className="table flex-table">
                <thead className="flex-table">
                <tr className="dark">
                    <th className="id">№</th>
                    <th className="id">ID</th>
                    <th className="little-wider">Назва Підприємтсва</th>
                    <th className="little-wider">Забруднювач</th>
                    <th>Ро</th>
                    <th>Qmin</th>
                    <th>Qm</th>
                    <th className="little-wider">Температура</th>
                    <th>ГДК</th>
                    <th>Кнас</th>
                    <th>Кф</th>
                    <th>Кт</th>
                    <th>Маса</th>
                    <th>Кзі</th>
                    <th>A</th>
                    <th className="little-wider">Загальна сума</th>
                    <th>Дата</th>
                    <th className="little-wider">Дії</th>
                </tr>
                </thead>
                {!loading && (
                    <tbody>
                    {compensations.map((comp, index) => (
                        <tr key={comp.id}>
                            <td>{index + 1}</td>
                            <td>{comp.id}</td>
                            <td>{comp.company.name}</td>
                            <td>{comp.pollutant.name}</td>
                            <td>{comp.ro}</td>
                            <td>{comp.qmn}</td>
                            <td>{comp.qm}</td>
                            <td>{comp.t}</td>
                            <td>{comp.gdk}</td>
                            <td>{comp.Knas}</td>
                            <td>{comp.Kf}</td>
                            <td>{comp.Kt}</td>
                            <td>{comp.m}</td>
                            <td>{comp.Kzi}</td>
                            <td>{comp.A}</td>
                            <td>{comp.total}</td>
                            <td>{comp.date}</td>
                            <td className="actions">
                                <button
                                    onClick={() => {
                                        setEditingCompensation(comp);
                                        setUpdateModal(true);
                                    }}
                                    className="btn btn-warning btn-sm mb-1 mt-1"
                                >
                                    Оновити
                                </button>
                                <button
                                    onClick={() => deleteCompensation(comp.id)}
                                    className="btn btn-danger btn-sm mb-1 mt-1"
                                >
                                    Видалити
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                )}
            </table>
            {loading &&
                <div className="loader-container">
                    <Loader />
                </div>
            }
            <div className="button-container">
                <button
                    type="button"
                    className="btn btn-primary m-2"
                    onClick={() => {
                        setEditingCompensation(null);
                        setModal(true);
                    }}
                >
                    Додати компенсацію
                </button>
            </div>
            <Modal visible={updateModal} setVisible={setUpdateModal}>
                <CompensationUpdateForm
                    initialData={editingCompensation}
                    objects={objects}
                    pollutants={pollutants}
                    isWater={false}
                    onSubmit={() => {
                        setUpdateModal(false);
                        fetchCompensations();
                    }}
                />
            </Modal>
            <Modal visible={modal} setVisible={setModal}>
                <CompensationPostForm
                    objects={objects}
                    pollutants={pollutants}
                    isWater={false}
                    onSubmit={() => {
                        setModal(false);
                        fetchCompensations();
                    }}
                />
            </Modal>
        </div>
    );
};

export default CompensationsAirList;
