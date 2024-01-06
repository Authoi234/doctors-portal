import React from 'react';
import Banner from '../Banner/Banner';
import ContactArea from '../ContactArea/ContactArea';
import Services from '../Services/Services';
import DantalCareSection from '../DantalCareSection/DantalCareSection';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import Reviews from '../Reviews/Reviews';
import ContactUs from '../ContactUs/ContactUs';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <ContactArea></ContactArea>
            <Services></Services>
            <DantalCareSection></DantalCareSection>
            <MakeAppointment></MakeAppointment>
            <Reviews></Reviews>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;