import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const { logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch((err) => console.error(err))
    }

    return (
        <div className='flex justify-center items-center'>
            <h2 className='text-6xl text-red-600 font-bold'>Oops, Something Went Wrong!!!</h2>
            <h4 className='text-3xl text-red-600 font-semibold'>{error.statusText || error.message}</h4>
            <h4 className='text-3xl'>Please <button onClick={handleLogOut} className='btn btn-ghost glass'>Sign Out</button> and Log back In.</h4>
        </div>
    );
};

export default DisplayError;