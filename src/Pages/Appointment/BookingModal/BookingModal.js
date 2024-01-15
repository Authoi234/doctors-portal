import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({treatment, setTreatment, selectedDate}) => {
    const date = format(selectedDate, 'PP');
    const {name, slots} = treatment;

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const appointmentDate = date;
        const slot = form.slot.value;
        const patientName = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        
        const booking = {
            slot,
            patient: patientName,
            email,
            phone,
            treatment: name,
            appointmentDate
        }

        console.log(booking);
        setTreatment(null);
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor='booking-modal' className="btn btn-sm btn-circle btn-neutral hover:scale-110 active:scale-75 absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-3'>
                        <input type="text" value={date} className="input w-full text-black input-bordered" disabled />
                        <select name='slot' className="select select-bordered w-full bg-base-100">
                            <option>Who shot first?</option>
                            {
                                slots.map((slot, i) => <option value={slot} key={i}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" placeholder="Your Name" className="input input-bordered w-full" />
                        <input name='email' type="email" placeholder="Email Address" className="input input-bordered w-full" />
                        <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full" />
                        <br />
                        <input htmlFor="booking-modal" className='btn btn-neutral w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;