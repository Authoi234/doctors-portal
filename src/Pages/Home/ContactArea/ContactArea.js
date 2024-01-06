import React from 'react';
import phoneImg from "../../../assets/icons/phone.svg"
import clockImg from "../../../assets/icons/clock.svg"
import locationImg from "../../../assets/icons/marker.svg"
import ContactAreaCard from './ContactAreaCard';

const ContactArea = () => {
    const cardData = [
        {
            id: 1,
            name: 'Opening Hours',
            discription: 'Opens 9.00 pm to 5.30 pm everyday',
            icon: clockImg,
            bgClass: 'bg-gradient-to-r from-secondary to-primary'
        },
        {
            id: 2,
            name: 'Visit our location',
            discription: 'Brooklyn, NY 10036, United States',
            icon: locationImg,
            bgClass: 'bg-accent'
        },
        {
            id: 3,
            name: 'Contact us',
            discription: '+000 123 456789',
            icon: phoneImg,
            bgClass: 'bg-gradient-to-r from-secondary to-primary'
        },
    ]
    return (
        <div className='sm:grid sm:grid-cols-1 md:flex md:justify-around mt-10'>
            {
                cardData.map(card => <ContactAreaCard key={card.id} card={card}></ContactAreaCard>)
            }
        </div>
    );
};

export default ContactArea;