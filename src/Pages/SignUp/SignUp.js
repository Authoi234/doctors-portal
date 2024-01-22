import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const SignUp = () => {

    const { createUser, updateUser, loginWithGoogle } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = (data) => {
        setError('')
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User created Successfully', {
                    style: {
                        backgroundColor: 'aquamarine',
                        color: 'white'
                    },
                });
                handleUpdateUserProfile(data.name);
            })
            .catch(err => {
                setError(err);
            })
    }

    const handleUpdateUserProfile = (name) => {
        const profile = {
            displayName: name,
        }
        updateUser(profile)
            .then(() => {
                navigate('/');
             })
            .catch((err) => setError(err))
    }

    const handleGoogleLogin = () => {
        setError('');

        loginWithGoogle()
        .then(result => {
            const user = result.user;
            console.log(user);
            navigate('/');
        })
        .catch(err => setError(err));
    }

    return (
        <div className='h-[550px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className="text-4xl text-center mb-5">Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <label className="form-control w-full max-w-xs">
                        <div className="label"><span className="label-text font-semibold">Name</span></div>
                        <input
                            className="input input-bordered w-full max-w-xs"
                            type="name"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className='text-red-500 font-bold'>{errors.name?.message}</p>}
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label"><span className="label-text font-semibold">Email</span></div>
                        <input
                            className="input input-bordered w-full max-w-xs lowercase"
                            type="email"
                            {...register("email", { required: "Email Address is required" })}
                        />
                        {errors.email && <p className='text-red-500 font-bold'>{errors.email?.message}</p>}
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label"><span className="label-text font-semibold">Password</span></div>
                        <input
                            className="input input-bordered w-full max-w-xs"
                            type="password"
                            {
                            ...register("password",
                                {
                                    required: 'Password is Required',
                                    minLength: { value: 6, message: "Password must be 6 characters or long." },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have a uppercase , number and a special characters' }
                                })
                            }
                        />
                        {errors.password && <p className='text-red-500 font-bold'>{errors.password?.message}</p>}
                    </label>
                    <input className='btn btn-neutral w-full my-3' type="submit" />
                    <div>
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                </form>
                <p className='my-2 text-sm'>Already Have an Account ? <Link className='text-emerald-400' to={'/login'}>Please Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline btn-neutral w-full' onClick={handleGoogleLogin}>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;