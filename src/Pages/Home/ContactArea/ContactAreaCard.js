import React from 'react';
import clockImg from "../../../assets/icons/clock.svg"

const ContactAreaCard = ({ card }) => {
    const { icon, discription, name, bgClass } = card
    return (
        <div className={`sm:block md:flex justify-center items-center break-words md:p-5 p-1 rounded-lg text-white sm:w-full md:w-1/3 lg:w-1/4 md:mx-5 mx-1 sm:my-5 my-5 ${bgClass}`}>
            <img className='pr-3' src={icon} alt="" />
            <div>
                <h1>{name}</h1>
                <h4>{discription}</h4>
            </div>
        </div>
    );
};

export default ContactAreaCard;