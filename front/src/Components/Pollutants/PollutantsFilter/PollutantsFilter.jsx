import {useState} from "react";
import ObjectFilter from "../../Objects/ObjectFilter/ObjectFilter";

const PollutantFilter = ({ fetch }) => {
    const [filter, setFilter] = useState({ filterBy: '', filterValue: '', sortBy: '', sortOrder: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const handleFilter = async () => {
        try{
            const res = await fetch(filter)
        }catch (err){

        }
    };

    return (
        <div className="p-3 bg-light rounded mb-3">
            <div className="row g-3">
                <div className="col-md-4">
                    <select
                        className="form-select"
                        name="filterBy"
                        value={filter.filterBy}
                        onChange={handleInputChange}
                    >
                        <option value="">Filter By</option>
                        <option value="name">Name</option>
                        <option value="dangerous_emissions">Dangerous Emissions</option>
                        <option value="permissible_emissions">Permissible Emissions</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        name="filterValue"
                        placeholder="Enter value"
                        value={filter.filterValue}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-2">
                    <select
                        className="form-select"
                        name="sortBy"
                        value={filter.sortBy}
                        onChange={handleInputChange}
                    >
                        <option value="">Sort By</option>
                        <option value="name">Name</option>
                        <option value="dangerous_emissions">Dangerous Emissions</option>
                        <option value="permissible_emissions">Permissible Emissions</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <select
                        className="form-select"
                        name="sortOrder"
                        value={filter.sortOrder}
                        onChange={handleInputChange}
                    >
                        <option value="">Order</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div className="col-md-12 text-end">
                    <button className="btn btn-primary" onClick={handleFilter}>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PollutantFilter