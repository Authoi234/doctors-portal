import React from 'react';
import chair from '../../../assets/images/chair.png';
import bgImg from '../../../assets/images/bg.png';

const Banner = () => {
    return (
        <div className="hero" style={{ backgroundImage: `url(${bgImg})`, backgroundRepeat: 'no-repeat' }}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} alt='' className="lg:w-1/2 rounded-lg shadow-2xl sm:w-full" />
                <div className='pl-10'>
                    <h1 className="text-5xl font-bold mb-3">Your New Smile Starts Here</h1>
                    <p className="py-6 mb-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                    <button className="btn bg-gradient-to-r from-secondary to-primary text-white">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;