import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../Components/UI/Modal/Modal";
import RiskHealthUpdateForm from "../../Components/RiskHealth/UpdateForm/RiskHealthUpdateForm";
import RiskHealthPostForm from "../../Components/RiskHealth/PostForm/RiskHealthPostForm";
import Filter from "../../Components/Filter/Filter";
import Loader from "../../Components/UI/Loader/Loader";

const RiskHealthList = () => {
    const [riskHealths, setRiskHealths] = useState([]);
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editingHealth, setEditingHealth] = useState(null);
    const [objects, setObjects] = useState()
    const [pollutants, setPollutants] = useState()

    const filterOptions = [
        { value: "sf", name: "sf" },
        { value: "rfc", name: "rfc" },
        { value: "concentration", name: "Концентрація" },
        { value: "date", name: "Дата" },
        { value: "hq", name: "hq" },
        { value: "ladd", name: "ladd" },
        { value: "cr", name: "cr" },
    ];

    const sortOptions = [
        { value: "sf", name: "sf" },
        { value: "rfc", name: "rfc" },
        { value: "concentration", name: "Концентрація" },
        { value: "date", name: "Дата" },
        { value: "hq", name: "hq" },
        { value: "ladd", name: "ladd" },
        { value: "cr", name: "cr" },
    ];

    const fetchRiskHealth = async ({ filterBy = "", filterValue = "", sortBy = "", sortOrder = "" } = {}) => {
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
            const res = await axios.get(`/risk_health/?${queryParams.toString()}`);
            setRiskHealths(res.data.risk_health);
            setObjects(res.data.objects);
            setPollutants(res.data.pollutants);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const deleteRiskHealth = async (id) => {
        try {
            await axios.delete(`/risk_health/${id}/`);
            fetchRiskHealth();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRiskHealth();
    }, []);


    const getHQColor = (value) => {
        if (value < 0.11) return "green";
        if (value >= 0.11 && value <= 1) return "yellow";
        if (value > 1 && value <= 3) return "orange";
        else return "red";
    };
    const getCRColor = (value) => {
        if (value <= 0.000001) return "green";
        if (value > 0.00001 && value <= 0.0001) return "yellow";
        if (value > 0.0001 && value <= 0.001) return "orange";
        else return "red";
    };

    return (
        <div className="container">
            <Filter fetch={fetchRiskHealth} filterOptions={filterOptions} sortOptions={sortOptions} />
            <table className="table">
                <thead>
                <tr className="dark">
                    <th className="id">№</th>
                    <th>ID</th>
                    <th className="wider">Назва підприємства</th>
                    <th className="wider">Забруднювач</th>
                    <th className="wider">Концентрація</th>
                    <th>SF</th>
                    <th>RFC</th>
                    <th className="wider">HQ</th>
                    <th>LADD</th>
                    <th className="wider">CR</th>
                    <th>Дата</th>
                    <th className="little-wider">Дії</th>
                </tr>
                </thead>
                {!loading && (
                    <tbody>
                    {riskHealths.map((health, index) => (
                        <tr key={health.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{health.id}</td>
                            <td >{health.company.name}</td>
                            <td >{health.pollutant.name}</td>
                            <td>{health.concentration}</td>
                            <td>{health.sf}</td>
                            <td>{health.rfc}</td>
                            <td style={{ backgroundColor: getHQColor(health.hq) }}>{health.hq.toFixed(7)}</td>
                            <td>{health.ladd.toFixed(3)}</td>
                            <td style={{ backgroundColor: getCRColor(health.cr) }}>{health.cr.toFixed(7)}</td>
                            <td>{health.date}</td>
                            <td className="actions">
                                <button
                                    onClick={() => {
                                        setEditingHealth(health);
                                        setUpdateModal(true);
                                    }}
                                    className="btn btn-warning btn-sm mb-1 mt-1"
                                >
                                    Оновити
                                </button>
                                <button
                                    onClick={() => deleteRiskHealth(health.id)}
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
            {loading && (
                <div className="loader-container">
                    <Loader />
                </div>
            )}
            <div className="button-container">
                <button
                    type="button"
                    className="btn btn-primary m-2"
                    onClick={() => {
                        setEditingHealth(null);
                        setModal(true);
                    }}
                >
                    Додати ризик здоров'я
                </button>
            </div>
            <Modal visible={updateModal} setVisible={setUpdateModal}>
                <RiskHealthUpdateForm
                    initialData={editingHealth}
                    companies={objects}
                    pollutants={pollutants}
                    onSubmit={() => {
                        setUpdateModal(false);
                        fetchRiskHealth();
                    }}
                />
            </Modal>
            <Modal visible={modal} setVisible={setModal}>
                <RiskHealthPostForm
                    companies={objects}
                    pollutants={pollutants}
                    onSubmit={() => {
                        setModal(false);
                        fetchRiskHealth();
                    }}
                />
            </Modal>
        </div>
    );
};

export default RiskHealthList;
