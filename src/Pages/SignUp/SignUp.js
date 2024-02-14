import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import { FaE, FaEye, FaEyeSlash } from "react-icons/fa6";
import useToken from '../../hooks/useToken';

const SignUp = () => {

    const { createUser, updateUser, loginWithGoogle } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signupError, setSignUpError] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    const handlePasswordShow = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
        }
        else {
            setPasswordType('password');
        }
    }

    const handleSignUp = (data) => {
        setSignUpError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                const profile = {
                    displayName: data.name,
                }
                updateUser(profile)
                    .then(() => {
                        saveUser(data.name, data.email);
                    })
                    .catch((err) => setSignUpError(err))

                toast.success('User created Successfully');
            })
            .catch(err => {
                setSignUpError(err);
            })
    }

    const handleGoogleLogin = () => {
        setSignUpError('');
        loginWithGoogle()
            .then(result => {
                const user = result.user;
                saveUser(user.displayName, user.email);
                toast.success('User created Successfully');
            })
            .catch(err => setSignUpError(err));
    }

    const saveUser = (name, email) => {
        const user = { name, email };
        console.log(user);

        fetch('https://doctors-portal-server-authoi234s-projects.vercel.app/users', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
            })
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
                        <p className='text-xs text-yellow-500'>⚠ ❗ warning: Please Write your email in lowercase, when write uppercase also will be showed as lowercase, but you need to write lowercard.Otherwise you cant access your data.</p>
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label"><span className="label-text font-semibold">Password</span></div>
                        <div className='flex items-center'>
                            <input
                                className="input input-bordered w-full max-w-xs"
                                type={passwordType}
                                {
                                ...register("password",
                                    {
                                        required: 'Password is Required',
                                        minLength: { value: 6, message: "Password must be 6 characters or long." },
                                        pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have a uppercase , number and a special characters' }
                                    })
                                }
                            />
                            <span className='text-2xl border p-2.5 rounded-r-lg tooltip' data-tip="Password Show/Hide" onClick={handlePasswordShow}>{passwordType === 'text' ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</span>
                        </div>
                        {errors.password && <p className='text-red-500 font-bold'>{errors.password?.message}</p>}
                    </label>
                    <input className='btn btn-neutral w-full my-3' type="submit" />
                    <div>
                        {signupError && <p className="text-red-500">{signupError}</p>}
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