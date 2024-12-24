import React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import cl from './Navbar.module.css';

const Navbar = ({ classNames }) => {
    const navigate = useNavigate();

    const isActive = (path) => window.location.pathname === path;

    return (
        <div>
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
                    <div
                        className={`${cl.item} ${isActive('/radioactive_waste') ? cl.active : ''}`}
                        onClick={() => navigate('/radioactive_waste')}
                    >
                        Радіоактивні відходи
                    </div>
                    <div
                        className={`${cl.item} ${isActive('/temporary_place') ? cl.active : ''}`}
                        onClick={() => navigate('/temporary_place')}
                    >
                        Тимчасове місце
                    </div>
                    <div
                        className={`${cl.item} ${isActive('/risk_health') ? cl.active : ''}`}
                        onClick={() => navigate('/risk_health')}
                    >
                        Ризик здоровью
                    </div>
                </div>
            </div>
            <div className={cl.under__nav}>
                Тіхонов О.С. Бабенко В.М. ТР-25
            </div>
        </div>
    );
};

export default Navbar;
