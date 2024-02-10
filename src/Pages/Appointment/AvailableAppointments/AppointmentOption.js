import React from 'react';

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
    const { name, price, slots } = appointmentOption;
    const disabled = slots.length === 0 ? true : false;
    return (
        <div className="card shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-emerald-400 text-center text-2xl font-bold">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Try another Day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} Available</p>
                <p className="text-md font-semibold text-emerald-400">Price: ${price}</p>
                <div className="card-actions justify-center">
                    <label
                        disabled={disabled}
                        htmlFor="booking-modal"
                        className="btn bg-gradient-to-r from-emerald-400 to-cyan-300 text-white"
                        onClick={() => setTreatment(appointmentOption)} 
                        >Book Appointment
                    </label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;