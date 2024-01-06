import React from 'react';
import quote from '../../../assets/icons/quote.svg';

const Reviews = () => {
    return (
        <div>
            <div className='flex justify-between'>
                <div>
                    <p></p>
                    <h1></h1>   
                </div>
                <div>
                    <img src={quote} alt="" />
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default Reviews;