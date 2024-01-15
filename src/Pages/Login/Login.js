import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signInUser, loginWithGoogle, sendForgetPasswordEmail } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const from = location?.state?.from?.pathname || '/';

    const handleLogin = data => {
        setLoginError('');
        console.log(data);
        signInUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
                toast.success('Successfully Logged In');
            })
            .catch((err) => setLoginError(err.message))
    }

    const handleGoogleLogin = () => {
        setLoginError('');

        loginWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
                toast.success('Successfully Logged In');
            })
            .catch(err => setLoginError(err));
    }

    const handleForgetPasswordCall = () => document.getElementById('resetPasswordModal').showModal();

    const handleResetPassword = (event) => {
        event.preventDefault();
        const resetPasswordEmail = event.target.resetPasswordEmail.value;
        console.log(resetPasswordEmail);
        sendForgetPasswordEmail(resetPasswordEmail);
        toast.success('We send a email for reset your Password');
        document.getElementById('resetPasswordModal').close();
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
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                            className="input input-bordered w-full max-w-xs" type="password" /><span></span>
                        <div className="label"><span className="label-text text-xs font-medium cursor-pointer underline" onClick={handleForgetPasswordCall}>Forget Password?</span></div>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </label>
                    <input className='btn btn-neutral w-full my-3' type="submit" />
                    <div>
                        {loginError && <p className="text-red-500">{loginError}</p>}
                    </div>
                </form>

                <p className='my-2 text-sm'>New to Doctors Portal ? <Link className='text-emerald-400' to={'/signup'}>Create A New Account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline btn-neutral w-full' onClick={handleGoogleLogin}>CONTINUE WITH GOOGLE</button>
                <dialog id="resetPasswordModal" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-emerald-400">Send Reset Email</h3>
                        <div className="modal-action">
                            <form onSubmit={handleResetPassword}>
                                <div className="text-center">
                                <input type="email" name='resetPasswordEmail' required placeholder='Please Write Your Email Here' className=' text-emerald-400 input input-bordered mx-4 px-3 py-1 text-lg w-96' />
                                    <input type='submit' value={'Submit'} className="btn my-2 btn-outline btn-neutral w-96" />
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default Login;