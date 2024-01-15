import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <button className="btn bg-gradient-to-r from-emerald-400 to-teal-300 text-white border-0">{children}</button>
    );
};

export default PrimaryButton;