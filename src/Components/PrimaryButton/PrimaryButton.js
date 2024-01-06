import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <button className="btn bg-gradient-to-r from-secondary to-primary text-white border-0">{children}</button>
    );
};

export default PrimaryButton;