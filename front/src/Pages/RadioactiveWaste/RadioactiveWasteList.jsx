import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../Components/UI/Modal/Modal";
import RadioactiveWasteUpdateForm from "../../Components/RadioactiveWaste/UpdateForm/RadioactiveWasteUpdateForm";
import RadioactiveWastePostForm from "../../Components/RadioactiveWaste/PostForm/RadioactiveWastePostForm";
import Filter from "../../Components/Filter/Filter";
import Loader from "../../Components/UI/Loader/Loader";
import objectsList from "../Objects/ObjectsList";

const RadioactiveWasteList = () => {
    const [radioactiveWastes, setRadioactiveWastes] = useState([]);
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editingWaste, setEditingWaste] = useState(null);
    const [objects, setObjects] = useState()

    const filterOptions = [
        { value: "company", name: "Компанія" },
        { value: "total_tax", name: "Сума податку" },
        { value: "on_electricity", name: "На електроенергію" },
        { value: "c1ns", name: "C1NS" },
        { value: "c2ns", name: "C2NS" },
        { value: "c1v", name: "C1V" },
        { value: "c2v", name: "C2V" },
        { value: "v1ns", name: "V1NS" },
        { value: "v2ns", name: "V2NS" },
        { value: "v1v", name: "V1V" },
        { value: "v2v", name: "V2V" },
    ];

    const sortOptions = [
        { value: "company", name: "Компанія" },
        { value: "total_tax", name: "Сума податку" },
        { value: "on_electricity", name: "На електроенергію" },
        { value: "c1ns", name: "C1NS" },
        { value: "c2ns", name: "C2NS" },
        { value: "c1v", name: "C1V" },
        { value: "c2v", name: "C2V" },
        { value: "v1ns", name: "V1NS" },
        { value: "v2ns", name: "V2NS" },
        { value: "v1v", name: "V1V" },
        { value: "v2v", name: "V2V" },
    ];

    const fetchRadioactiveWastes = async ({ filterBy = "", filterValue = "", sortBy = "", sortOrder = "" } = {}) => {
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
            const res = await axios.get(`/radioactive_waste/?${queryParams.toString()}`);
            setRadioactiveWastes(res.data.radioactive_waste);
            setObjects(res.data.objects);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteRadioactiveWaste = async (id) => {
        try {
            await axios.delete(`/radioactive_waste/${id}/`);
            fetchRadioactiveWastes();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRadioactiveWastes();
    }, []);

    return (
        <div className="container">
            <Filter
                fetch={fetchRadioactiveWastes}
                filterOptions={filterOptions}
                sortOptions={sortOptions}
            />
            <table className="table">
                <thead>
                <tr className="dark">
                    <th className="id">№</th>
                    <th className="id">ID</th>
                    <th className="little-wider">Назва підприємства</th>
                    <th className="little-wider">Обсяг електроенергії</th>
                    <th>C1NS</th>
                    <th>C2NS</th>
                    <th>C1V</th>
                    <th>C2V</th>
                    <th>V1NS</th>
                    <th>V2NS</th>
                    <th>V1V</th>
                    <th>V2V</th>
                    <th className="wider">Сума податку</th>
                    <th className="little-wider">Дії</th>
                </tr>
                </thead>
                {!loading && (
                    <tbody>
                    {radioactiveWastes.map((waste, index) => (
                        <tr key={waste.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{waste.id}</td>
                            <td>{waste.company.name}</td>
                            <td>{waste.on_electricity}</td>
                            <td>{waste.c1ns}</td>
                            <td>{waste.c2ns}</td>
                            <td>{waste.c1v}</td>
                            <td>{waste.c2v}</td>
                            <td>{waste.v1ns}</td>
                            <td>{waste.v2ns}</td>
                            <td>{waste.v1v}</td>
                            <td>{waste.v2v}</td>
                            <td>{waste.total_tax.toFixed(2)}</td>
                            <td className="actions">
                                <button
                                    onClick={() => {
                                        setEditingWaste(waste);
                                        setUpdateModal(true);
                                    }}
                                    className="btn btn-warning btn-sm mb-1 mt-1"
                                >
                                    Оновити
                                </button>
                                <button
                                    onClick={() => deleteRadioactiveWaste(waste.id)}
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
                        setEditingWaste(null);
                        setModal(true);
                    }}
                >
                    Додати радіоактивні відходи
                </button>
            </div>
            <Modal visible={updateModal} setVisible={setUpdateModal}>
                <RadioactiveWasteUpdateForm
                    initialData={editingWaste}
                    objects={objects}
                    onSubmit={() => {
                        setUpdateModal(false);
                        fetchRadioactiveWastes();
                    }}
                />
            </Modal>
            <Modal visible={modal} setVisible={setModal}>
                <RadioactiveWastePostForm
                    objects={objects}
                    onSubmit={() => {
                        setModal(false);
                        fetchRadioactiveWastes();
                    }}
                />
            </Modal>
        </div>
    );
};

export default RadioactiveWasteList;
