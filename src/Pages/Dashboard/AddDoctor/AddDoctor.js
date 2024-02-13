import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import Loading from './../../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate();

    const { data: specialities, isLoading } = useQuery({
        queryKey: ['speciality'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-authoi234s-projects.vercel.app/appointmentSpeciality');
            const data = await res.json();
            return data;

        }
    });

    const handleAddDoctor = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if (imgData.success) {
                console.log(imgData.data.url);
                const doctor = {
                    name: data.name,
                    email: data.email,
                    speciality: data.speciality,
                    image: imgData.data.url
                }

                // save doctor information to the database
                fetch('https://doctors-portal-server-authoi234s-projects.vercel.app/doctors', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    toast.success(`👍 Doctor ${data.name} is added successfully 🚑`);
                    navigate('/dashboard/managedoctors')
                })

            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='md:w-2/5 w-full p-7'>
            <h2 className='text-5xl font-bold'>Add A New Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)} className=''>
                <label className="form-control w-full max-w-lg">
                    <div className="label"><span className="label-text font-semibold">Name</span></div>
                    <input
                        className="input input-bordered w-full max-w-lg"
                        type="name"
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <p className='text-red-500 font-bold'>{errors.name?.message}</p>}
                </label>
                <label className="form-control w-full max-w-lg">
                    <div className="label"><span className="label-text font-semibold">Email</span></div>
                    <input className="input input-bordered w-full max-w-lg lowercase" type="email" {...register("email", { required: "Email Address is required" })}
                    />
                    {errors.email && <p className='text-red-500 font-bold'>{errors.email?.message}</p>}
                </label>
                <label className="form-control w-full max-w-lg">
                    <label className="label"><span className="label-text font-semibold">Speciality</span></label>
                    <select {...register("speciality", { required: true })} className="select select-bordered w-full max-w-lg">
                        <option disabled selected>Pick One Speciality of Doctor</option>
                        {
                            specialities?.map(speciality => <option key={speciality._id} value={speciality.name}>{speciality.name}</option>)
                        }
                    </select>
                </label>
                <label className="form-control w-full max-w-lg">
                    <label className="label"><span className="label-text font-semibold">Photo</span></label>
                    <input
                        className="file-input file-input-bordered w-full max-w-lg" type="file" accept='image/*' {...register("image", { required: "Photo is required" })}
                    />
                    {errors.img && <p className='text-red-500 font-bold'>{errors.email?.message}</p>}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label"><span className="label-text font-semibold">Password</span></div>
                    {errors.password && <p className='text-red-500 font-bold'>{errors.password?.message}</p>}
                </label>
                <input className='btn btn-neutral w-full my-3' type="submit" />
            </form>
        </div>
    );
};


/**
 * three places to store images
 * 1. thirdparty image hosting server
 * 2. file system of your server
 * 3. mongodb (database)
*/

export default AddDoctor;