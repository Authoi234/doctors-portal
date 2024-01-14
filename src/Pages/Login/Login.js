import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const {signInUser} = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const from = location?.state?.from?.pathname || '';

    const handleLogin = data => {
        setLoginError('');
        console.log(data);
        signInUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            navigate(from, {replace: true});
        })
        .catch((err) => setLoginError(err.message))
    }

    return (
        <div className='h-[550px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className="text-4xl text-center mb-5">Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <label className="form-control w-full max-w-xs">
                        <div className="label"><span className="label-text font-semibold">Email</span></div>
                        <input
                            {...register("email", {
                                required: 'Email Address is Required'
                            })}
                            className="input input-bordered w-full max-w-xs lowercase" type="email" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label"><span className="label-text font-semibold">Password</span></div>
                        <input
                            {...register("password", {
                                required: 'Password is required',
                                minLength: { value: 6 , message: 'Password must be 6 characters or longer' }
                            })}
                            className="input input-bordered w-full max-w-xs" type="password" />
                        <div className="label"><span className="label-text text-xs font-medium">Forget Password?</span></div>
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </label>
                    <input className='btn btn-accent w-full my-3' type="submit" />
                    <div>
                        {loginError && <p className="text-red-500">{loginError}</p>}
                    </div>
                </form>

                <p className='my-2 text-sm'>New to Doctors Portal ? <Link className='text-secondary' to={'/signup'}>Create A New Account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline btn-accent w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;