import React from 'react';
import cl from './Footer.module.css';

const Navbar = ({ classNames }) => {

    return (
        <div>
            <div className={cl.footer}>
                Дудченко В.О.
            </div>
        </div>
    );
};

export default Navbar;
