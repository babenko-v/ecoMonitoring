import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Filter = ({ fetch, filterOptions, sortOptions }) => {
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
        <div className="filter p-3 rounded mb-3">
            <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-column flex-md-row gap-3 w-75">
                    <div className="col-md">
                        <label htmlFor="filterBy" className="form-label">Фільтрувати за</label>
                        <select
                            id="filterBy"
                            className="form-select"
                            name="filterBy"
                            value={filter.filterBy}
                            onChange={handleInputChange}
                        >
                            <option value="">Виберіть...</option>
                            {filterOptions.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md">
                        <label htmlFor="filterValue" className="form-label">Значення</label>
                        <input
                            id="filterValue"
                            type="text"
                            className="form-control"
                            name="filterValue"
                            placeholder="Введіть значення"
                            value={filter.filterValue}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="d-flex flex-column flex-md-row gap-3 w-75">
                    <div className="col-md">
                        <label htmlFor="sortBy" className="form-label">Сортувати за</label>
                        <select
                            id="sortBy"
                            className="form-select"
                            name="sortBy"
                            value={filter.sortBy}
                            onChange={handleInputChange}
                        >
                            <option value="">Виберіть...</option>
                            {sortOptions.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md">
                        <label htmlFor="sortOrder" className="form-label">Порядок</label>
                        <select
                            id="sortOrder"
                            className="form-select"
                            name="sortOrder"
                            value={filter.sortOrder}
                            onChange={handleInputChange}
                        >
                            <option value="">Виберіть...</option>
                            <option value="asc">За зростанням</option>
                            <option value="desc">За спаданням</option>
                        </select>
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={handleFilter}>
                        Застосувати
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
