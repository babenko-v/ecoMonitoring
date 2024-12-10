import React from 'react';

const CustomInput = ({className, ...props}) => {
    return (
        <div className="input-group mb-3">
            <input {...props} className={["form-control", className].join(' ')} />
        </div>
    );
};

export default CustomInput;