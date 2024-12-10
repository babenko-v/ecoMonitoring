import React from 'react';
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="navbar-brand" >EcoMonitoring</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <div className="nav-link cursor-pointer" aria-current="page" onClick={()=>{navigate('/objects')}}>Objects</div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link cursor-pointer" onClick={()=>{navigate('/pollutants')}}>Pollutants</div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link cursor-pointer" onClick={()=>{navigate('/calculations')}}>Calculations</div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;