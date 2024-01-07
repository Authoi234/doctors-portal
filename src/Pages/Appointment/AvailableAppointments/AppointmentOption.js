import React from 'react';
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';

const AppointmentOption = ({ appointmentOption }) => {
    const { name, slots } = appointmentOption;
    return (
        <div className="card shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-secondary text-center text-2xl font-bold">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Try another Day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} Available</p>
                <div className="card-actions justify-center">
                    <PrimaryButton>Book Appointment</PrimaryButton>
                    <label htmlFor="booking-modal" className="btn">open modal</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;