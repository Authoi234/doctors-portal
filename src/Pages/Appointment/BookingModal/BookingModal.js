import { format } from 'date-fns';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    const date = format(selectedDate, 'PP');
    const { name, slots, price } = treatment;
    const { user } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const appointmentDate = date;
        const slot = form.slot.value;
        const patientName = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        // [3, 4, 5].map((value, i) => console.log(value)) 
        const booking = {
            appointmentDate,
            treatment: name,
            patient: patientName,
            slot,
            email,
            phone,
            price
        }

        // TODO : send data to the server
        // and once data is saved then close the modal
        // and display success toast
        fetch('https://doctors-portal-server-authoi234s-projects.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('👨‍⚕️ Booking Confirmed');
                    refetch();
                }
                else{
                    toast.error( data.message);
                }
            })

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
                        <select name='slot' className="select select-bordered w-full bg-base-100" required>
                            {
                                slots.map((slot, i) => <option value={slot} key={i}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled required placeholder="Your Name" className="input input-bordered w-full" />
                        <input name='email' type="email" defaultValue={user?.email} placeholder="Email Address" disabled required className="input input-bordered w-full" />
                        <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full" required />
                        <br />
                        <input htmlFor="booking-modal" className='btn btn-neutral w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;