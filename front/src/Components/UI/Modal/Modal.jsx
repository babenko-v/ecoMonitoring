import React from 'react';
import cl from './Modal.module.css'

const Modal = ({children, visible, setVisible}) => {
    const rootClasses = [cl.modal]
    if(visible) {
        rootClasses.push(cl.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                <div>
                    {children}
                </div>
            </div>
        </div>

    );
};

export default Modal;