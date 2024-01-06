import React from 'react';
import Banner from '../Banner/Banner';
import ContactArea from '../ContactArea/ContactArea';
import Services from '../Services/Services';
import DantalCareSection from '../DantalCareSection/DantalCareSection';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <ContactArea></ContactArea>
            <Services></Services>
            <DantalCareSection></DantalCareSection>
        </div>
    );
};

export default Home;