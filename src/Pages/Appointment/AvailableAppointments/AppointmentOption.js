import React from 'react';

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
    const { name, slots } = appointmentOption;
    return (
        <div className="card shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-emerald-400 text-center text-2xl font-bold">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Try another Day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} Available</p>
                <div className="card-actions justify-center">
                    <label
                        disabled={slots.length === 0}
                        htmlFor="booking-modal"
                        className="btn bg-gradient-to-r from-emerald-400 to-teal-300 text-white"
                        onClick={() => setTreatment(appointmentOption)} 
                        >Book Appointment
                    </label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;