import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import cl from './Navbar.module.css';

const Navbar = ({ classNames }) => {
    const navigate = useNavigate();

    return (
        <div className={[cl.navbar, classNames].join(' ')}>
            <div className={cl.main__links}>
                <div className={cl.main__item}>EcoMonitoring</div>
            </div>
            <div className={cl.navbar__links}>
                <div className={cl.item} onClick={() => navigate('/objects')}>objects</div>
                <div className={cl.item} onClick={() => navigate('/pollutants')}>pollutants</div>
                <div className={cl.item} onClick={() => navigate('/calculations')}>calculations</div>
            </div>
        </div>
    );
};

export default Navbar;