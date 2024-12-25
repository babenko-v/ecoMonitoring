import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../../Filter/Filter";
import Loader from "../../UI/Loader/Loader";
import Modal from "../../UI/Modal/Modal";
import CompensationUpdateForm from "../UpdateForm/CompensationUpdateForm";
import CompensationPostForm from "../PostForm/CompensationPostForm";

const CompensationsWaterList = () => {
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
        { value: "Y", name: "Y" },
        { value: "CiD", name: "CiD" },
        { value: "CiF", name: "CiF" },
        { value: "QIf", name: "QIf" },
        { value: "t", name: "Температура" },
        { value: "gdk", name: "ГДК" },
        { value: "Kkat", name: "Kкат" },
        { value: "Kr", name: "Кр" },
        { value: "Yi", name: "Yi" },
        { value: "m", name: "Маса" },
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
            const res = await axios.get(`/compensations_water/?${queryParams.toString()}`);
            setCompensations(res.data.compensation_water);
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
            await axios.delete(`/compensations_water/${id}/`);
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
                    <th>Y</th>
                    <th>CiD</th>
                    <th>CiF</th>
                    <th>QIf</th>
                    <th className="little-wider">Температура</th>
                    <th>ГДК</th>
                    <th>Kкат</th>
                    <th>Кр</th>
                    <th>Yi</th>
                    <th className="wider-5">Маса</th>
                    <th>A</th>
                    <th className="little-wider">Загальна сума</th>
                    <th className="wider-5">Дата</th>
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
                            <td>{comp.Y}</td>
                            <td>{comp.CiD}</td>
                            <td>{comp.CiF}</td>
                            <td>{comp.QIf}</td>
                            <td>{comp.t}</td>
                            <td>{comp.gdk}</td>
                            <td>{comp.Kkat}</td>
                            <td>{comp.Kr}</td>
                            <td>{comp.Yi}</td>
                            <td>{comp.m}</td>
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
            {loading && <Loader />}
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
                    isWater={true}
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
                    isWater={true}
                    onSubmit={() => {
                        setModal(false);
                        fetchCompensations();
                    }}
                />
            </Modal>
        </div>
    );
};

export default CompensationsWaterList;
