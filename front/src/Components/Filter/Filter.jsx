import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CalculationFilter = ({ fetch, filterOptions, sortOptions }) => {
    const [filter, setFilter] = useState({ filterBy: '', filterValue: '', sortBy: '', sortOrder: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const handleFilter = async () => {
        try {
            await fetch(filter);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-3 bg-light rounded mb-3">
            <div className="row g-3">
                <div>
                    <div>Фільтрування</div>
                    <div className="col-md-4">
                        <select
                            className="form-select m-2"
                            name="filterBy"
                            value={filter.filterBy}
                            onChange={handleInputChange}
                        >
                            <option value="">Фільтрувати за</option>
                            {filterOptions.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4 m-2">
                        <input
                            type="text"
                            className="form-control"
                            name="filterValue"
                            placeholder="Введіть значення"
                            value={filter.filterValue}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <div>Сортування</div>
                    <div className="col-md-2 m-2">
                        <select
                            className="form-select"
                            name="sortBy"
                            value={filter.sortBy}
                            onChange={handleInputChange}
                        >
                            <option value="">Сортувати за</option>
                            {sortOptions.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-2 m-2">
                        <select
                            className="form-select"
                            name="sortOrder"
                            value={filter.sortOrder}
                            onChange={handleInputChange}
                        >
                            <option value="">Порядок</option>
                            <option value="asc">За зростанням</option>
                            <option value="desc">За спаданням</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="col-md-12 text-end">
                <button className="btn btn-primary" onClick={handleFilter}>
                    Застосувати
                </button>
            </div>
        </div>
    );
};

export default CalculationFilter;
