import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../Components/UI/Modal/Modal";
import TemporaryPlaceUpdateForm from "../../Components/TemporaryPlace/UpdateForm/TemporaryPlaceUpdateForm";
import TemporaryPlacePostForm from "../../Components/TemporaryPlace/PostForm/TemporaryPlacePostForm";
import Filter from "../../Components/Filter/Filter";
import Loader from "../../Components/UI/Loader/Loader";

const TemporaryPlaceList = () => {
    const [temporaryPlaces, setTemporaryPlaces] = useState([]);
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editingPlace, setEditingPlace] = useState(null);

    const filterOptions = [
        { value: "company", name: "Компанія" },
        { value: "total_tax", name: "Сума податку" },
        { value: "n", name: "N" },
        { value: "v", name: "V" },
        { value: "t", name: "T" },
    ];

    const sortOptions = [
        { value: "company", name: "Компанія" },
        { value: "total_tax", name: "Сума податку" },
        { value: "n", name: "N" },
        { value: "v", name: "V" },
        { value: "t", name: "T" },
    ];

    const fetchTemporaryPlaces = async ({ filterBy = "", filterValue = "", sortBy = "", sortOrder = "" } = {}) => {
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
            const res = await axios.get(`/temporary_place/?${queryParams.toString()}`);
            setTemporaryPlaces(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteTemporaryPlace = async (id) => {
        try {
            await axios.delete(`/temporary_place/${id}/`);
            fetchTemporaryPlaces();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTemporaryPlaces();
    }, []);

    return (
        <div className="container">
            <Filter
                fetch={fetchTemporaryPlaces}
                filterOptions={filterOptions}
                sortOptions={sortOptions}
            />
            <table className="table">
                <thead>
                <tr className="dark">
                    <th className="id">№</th>
                    <th className="id">ID</th>
                    <th>Назва підприємства</th>
                    <th>N</th>
                    <th>V</th>
                    <th>T</th>
                    <th className="wider">Сума податку</th>
                    <th className="little-wider">Дії</th>
                </tr>
                </thead>
                {!loading && (
                    <tbody>
                    {temporaryPlaces.map((place, index) => (
                        <tr key={place.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{place.id}</td>
                            <td>{place.company}</td>
                            <td>{place.n}</td>
                            <td>{place.v}</td>
                            <td>{place.t}</td>
                            <td>{place.total_tax.toFixed(2)}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setEditingPlace(place);
                                        setUpdateModal(true);
                                    }}
                                    className="btn btn-warning btn-sm"
                                >
                                    Оновити
                                </button>
                                <button
                                    onClick={() => deleteTemporaryPlace(place.id)}
                                    className="btn btn-danger btn-sm"
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
                        setEditingPlace(null);
                        setModal(true);
                    }}
                >
                    Додати тимчасове місце
                </button>
            </div>
            <Modal visible={updateModal} setVisible={setUpdateModal}>
                <TemporaryPlaceUpdateForm
                    initialData={editingPlace}
                    onSubmit={() => {
                        setUpdateModal(false);
                        fetchTemporaryPlaces();
                    }}
                />
            </Modal>
            <Modal visible={modal} setVisible={setModal}>
                <TemporaryPlacePostForm
                    onSubmit={() => {
                        setModal(false);
                        fetchTemporaryPlaces();
                    }}
                />
            </Modal>
        </div>
    );
};

export default TemporaryPlaceList;
