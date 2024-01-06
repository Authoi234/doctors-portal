import React from 'react';
import treatment from '../../../assets/images/treatment.png';

const DantalCareSection = () => {
    return (
        <div className="flex justify-evenly items-center mt-14">
            <div className='w-1/3 '>
                <img src={treatment} alt=''/>
            </div>
            <div className='w-1/3'>
                <h1 className='text-5xl font-bold my-5'>Exceptional Dental Care, on Your Terms</h1>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                <button className="btn bg-gradient-to-r from-secondary to-primary text-white my-4">Get Started</button>
            </div>
        </div>
    );
};

export default DantalCareSection;