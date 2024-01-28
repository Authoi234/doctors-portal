import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    return (
        <div>
            <h3 className="text-3xl mb-5 font-semibold">My Appointments</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className='bg-base-300'>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, i) => <tr className='hover' key={i}>
                                <th>{i + 1}</th>
                                <td>{booking.patient}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.appointmentDate}</td>
                                <td>{booking.slot}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;