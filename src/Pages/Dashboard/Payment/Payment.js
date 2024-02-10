import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const booking = useLoaderData();

    return (
        <div>
            <h3 className="text-3xl">Payment for {booking.treatment}</h3>
            <p className="text-xl">Please Pay {booking.price}</p>
        </div>
    );
};

export default Payment;