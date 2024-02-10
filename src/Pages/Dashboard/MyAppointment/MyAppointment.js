import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

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
                            <th>NAME</th>
                            <th>TREATMENT</th>
                            <th>DATE</th>
                            <th>TIME</th>
                            <th>PAYMENT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings &&
                            bookings?.map((booking, i) => <tr className='hover' key={i}>
                                <th>{i + 1}</th>
                                <td>{booking.patient}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.appointmentDate}</td>
                                <td>{booking.slot}</td>
                                <td>
                                    {
                                        booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}>
                                            <button className='btn bg-gradient-to-r from-emerald-400 to-cyan-300 text-white mask mask-squircle'>Pay</button>
                                        </Link>
                                    }
                                    {
                                        booking.price && booking.paid && <span className='text-cyan-300 p-1 text-lg'>Paid</span>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;