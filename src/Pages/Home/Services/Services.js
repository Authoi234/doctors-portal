import React from 'react';
import fluoride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import Whitening from '../../../assets/images/whitening.png';
import Service from './Service';

const Services = () => {
    const servicesData = [
        {
            id: 1,
            name: 'Fluoride Treatment',
            discription: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            icon: fluoride
        },
        {
            id: 2,
            name: 'Cavity Filling',
            discription: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            icon: cavity
        },
        {
            id: 3,
            name: 'Teeth Whitening',
            discription: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            icon: Whitening
        },
    ];
    return (
        <div className='mt-14'>
            <div className='text-center'>
                <h3 className='text-teal-300 font-bold text-2xl'>OUR SERVICES</h3>
                <h1 className='text-gray-600 font-semibold mb-3 text-5xl'>Services We Provide</h1>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
                {
                    servicesData.map(service => <Service key={service.id} service={service}></Service>)
                }
            </div>
        </div>
    );
};

export default Services;