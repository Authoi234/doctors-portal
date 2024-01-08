import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className='h-[550px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className="text-4xl text-center mb-5">Sign Up</h2>
                <form>
                    <label className="form-control w-full max-w-xs">
                        <div className="label"><span className="label-text font-semibold">Name</span></div>
                        <input
                            className="input input-bordered w-full max-w-xs" type="name" />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label"><span className="label-text font-semibold">Email</span></div>
                        <input
                            className="input input-bordered w-full max-w-xs" type="email" />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label"><span className="label-text font-semibold">Password</span></div>
                        <input
                            
                            className="input input-bordered w-full max-w-xs" type="password" />
                        <div className="label"><span className="label-text text-xs font-medium">Forget Password?</span></div>
                    </label>
                    <input className='btn btn-accent w-full' type="submit" />
                </form>
                <p className='my-2 text-sm'>Already Have an Account ? <Link className='text-secondary' to={'/login'}>Please Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline btn-accent w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;