import React from 'react';

const Review = ({ review }) => {
    const { name, review: userReview, img, location } = review;
    return (
        <div className="card shadow-xl">
            <div className="card-body">
                <p>{userReview}</p>
                <div className="flex items-center mt-5">
                    <div className="avatar mr-6">
                        <div className="w-16 rounded-full ring ring-teal-300 ring-offset-white ring-offset-2">
                            <img src={img} alt='' />
                        </div>
                    </div>
                    <h5 className="text-lg">{name}</h5>
                    <p>{location}</p>
                </div>
            </div>
        </div>
    );
};

export default Review;