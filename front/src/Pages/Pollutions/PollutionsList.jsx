import React, {useEffect, useState} from 'react';
import axios from "axios";

const PollutionsList = () => {
    const [objects, setObjects] = useState([]);

    const fetchObjects = async () => {
        try {
            const res = await axios.get("/objects");
            setObjects(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchObjects();
    }, []);

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Head</th>
                    <th>Address</th>
                    <th>Economic Activity</th>
                    <th>Ownership</th>
                </tr>
                </thead>
                <tbody>
                {objects.map((obj, index) => (
                    <tr key={obj.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{obj.name}</td>
                        <td>{obj.head}</td>
                        <td>{obj.address}</td>
                        <td>{obj.economic_activity}</td>
                        <td>{obj.ownership}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PollutionsList;