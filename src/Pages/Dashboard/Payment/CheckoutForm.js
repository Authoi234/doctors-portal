import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [proccessing, setProccessing] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { price, email, patient, _id } = booking;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        setCardError('')
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        });

        if (error) {
            setCardError(error.message);
            return;
        }
        else {
            setCardError('')
        }
        setSuccess('');
        setProccessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    },
                },
            }
        )

        if(confirmError){
            setCardError(confirmError.message);
            return;
        }

        if(paymentIntent.status === "succeeded"){
            console.log('card info', card)
            // store payment info in db
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
            }
            fetch('http://localhost:5000/payments', {
                method: 'POST', 
                headers: {
                    "content-type" : "application/json",
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    setSuccess('Congrats! your payment completed');
                    setTransactionId(paymentIntent.id);
                    navigate('/dashboard')
                }
            })
        }
        setProccessing(false)

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#d6c8e7',
                                },
                            },
                            invalid: {
                                color: '#e14d60',
                            },
                        },
                    }}
                />
                <button className='btn btn-md mt-4 bg-cyan-400 hover:btn-primary transition-all text-lg' type="submit" disabled={!stripe || !clientSecret || proccessing}>
                    PAY
                </button>
            </form>
            <p className='font-bold text-lg text-red-500 my-6'>{cardError}</p>
            {
                success && <div className='my-4'>
                    <p className="text-green-500 text-lg font-semibold my-2">{success}</p>
                    <p className="text-green-500 text-lg font-semibold my-2">Your Transaction Id is: <span className='font-bold text-green-600 my-2'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;