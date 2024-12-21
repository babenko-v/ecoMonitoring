import React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import cl from './Navbar.module.css';

const Navbar = ({ classNames }) => {
    const navigate = useNavigate();

    const isActive = (path) => window.location.pathname === path;

    return (
        <div className={[cl.navbar, classNames].join(' ')}>
            <div className={cl.main__links}>
                <div className={cl.main__item}>ЕкоМоніторинг</div>
            </div>
            <div className={cl.navbar__links}>
                <div
                    className={`${cl.item} ${isActive('/objects') ? cl.active : ''}`}
                    onClick={() => navigate('/objects')}
                >
                    Об'єкти
                </div>
                <div
                    className={`${cl.item} ${isActive('/pollutants') ? cl.active : ''}`}
                    onClick={() => navigate('/pollutants')}
                >
                    Забруднюючі речовини
                </div>
                <div
                    className={`${cl.item} ${isActive('/calculations') ? cl.active : ''}`}
                    onClick={() => navigate('/calculations')}
                >
                    Розрахунки
                </div>
            </div>
        </div>
    );
};

export default Navbar;
