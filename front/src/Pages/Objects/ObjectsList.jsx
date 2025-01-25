import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../Components/UI/Modal/Modal";
import ObjectUpdateForm from "../../Components/Objects/UpdateForm/ObjectUpdateForm";
import PollutantPostForm from "../../Components/Pollutants/PostForm/PollutantPostForm";
import ObjectPostForm from "../../Components/Objects/PostForm/ObjectPostForm";
import Filter from "../../Components/Filter/Filter";
import Loader from "../../Components/UI/Loader/Loader";

const ObjectsList = () => {
    const [objects, setObjects] = useState([]);
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editingObject, setEditingObject] = useState(null);
    const filterOptions =
        [
            {value : 'name', name : 'Назва'},
            {value : 'head', name : 'Керівник'},
            {value : 'address', name : 'Адреса'},
            {value : 'economic_activity', name : 'Економічна активність'},
            {value : 'ownership', name : 'Форма власності'},
        ];
    const sortOptions = [
        {value : 'name', name : 'Назва'},
        {value : 'head', name : 'Керівник'},
        {value : 'address', name : 'Адреса'},
        {value : 'economic_activity', name : 'Адреса'},
        {value : 'ownership', name : 'Адреса'},
    ];

    const fetchObjects = async ({ filterBy = '', filterValue = '', sortBy = '', sortOrder = '' } ={}) => {
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
            const res = await axios.get(`/objects/?${queryParams.toString()}`);
            setObjects(res.data)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    };

    const deleteObject = async (id) => {
        try {
            await axios.delete(`/objects/${id}/`);
            fetchObjects();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchObjects();
    }, []);

    return (
        <div className="container">
            <div className="title">Об'єкти</div>
            <Filter
                fetch={fetchObjects}
                filterOptions={filterOptions}
                sortOptions={sortOptions}
            />
            <table className="table flex-table">
                <thead className="flex-table">
                <tr className="dark">
                    <th className="id">№</th>
                    <th className="id">ID</th>
                    <th>Назва</th>
                    <th>Керівник</th>
                    <th>Адреса</th>
                    <th>Економічна активність</th>
                    <th>Форма власності</th>
                    <th>Дії</th>
                </tr>
                </thead>

                {!loading &&
                    <tbody>
                    {objects.map((obj, index) => (
                        <tr key={obj.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{obj.id}</td>
                            <td>{obj.name}</td>
                            <td>{obj.head}</td>
                            <td>{obj.address}</td>
                            <td>{obj.economic_activity}</td>
                            <td>{obj.ownership}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setEditingObject(obj);
                                        setUpdateModal(true);
                                    }}
                                    className="btn btn-warning btn-sm mb-1 mt-1"
                                >
                                    Оновити
                                </button>
                                <button
                                    onClick={() => deleteObject(obj.id)}
                                    className="btn btn-danger btn-sm mb-1 mt-1"
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
                        setEditingObject(null);
                        setModal(true);
                    }}

                >
                    Додати об'єкт
                </button>
            </div>

            <Modal visible={updateModal} setVisible={setUpdateModal}>
                <ObjectUpdateForm
                    initialData={editingObject}
                    onSubmit={() => {
                        setUpdateModal(false);
                        fetchObjects();
                    }}
                />
            </Modal>
            <Modal visible={modal} setVisible={setModal}>
                <ObjectPostForm onSubmit={() => {
                    setModal(false);
                    fetchObjects();
                }}/>
            </Modal>
        </div>
    );
};

export default ObjectsList;
