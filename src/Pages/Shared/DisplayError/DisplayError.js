import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('signed out');
                navigate('/login')
            })
            .catch((err) => console.error(err))
    }

    return (
        <div className='text-center'>
            <h2 className='text-6xl text-red-600 font-bold flex justify-center items-center mt-10 mb-4'>Oops, Something Went Wrong!!!</h2>
            <h4 className='text-3xl text-red-600 font-semibold flex justify-center items-center my-3'>{error.statusText || error.message}</h4>
            <h4 className='text-3xl mt-3 mb-1 flex justify-center items-center'>Please <button onClick={handleLogOut} className='btn btn-primary text-3xl'>Sign Out</button> and Log back In.</h4>
            <img src="https://i.ibb.co/q7QNHRj/page-found-concept-illustration-114360-1869.jpg" style={{ transform: 'translate(50%, 0%)' }} alt="" />
        </div>
    );
};

export default DisplayError;