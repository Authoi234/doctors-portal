import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';

const AvailableAppointments = ({selectedDate}) => {
    const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null);

    useEffect(() => {
        fetch('appointmentOptions.json')
        .then(res => res.json())
        .then(data => setAppointmentOptions(data))
    }, [])

    return (
        <section className='my-16'>
            <p className='text-center text-secondary font-bold'>Available Appointments on {format(selectedDate, 'PP')}</p>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-6'>
                {
                    appointmentOptions.map(option => <AppointmentOption key={option._id} appointmentOption={option} setTreatment={setTreatment}></AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal treatment={treatment} setTreatment={setTreatment} selectedDate={selectedDate}></BookingModal>}
        </section>
    );
};

export default AvailableAppointments;