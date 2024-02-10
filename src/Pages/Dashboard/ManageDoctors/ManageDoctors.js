import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import toast from 'react-hot-toast';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const closeModal = () => {
        setDeletingDoctor(null)
    }

    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: 'doctors',
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch {

            }
        }
    });

    const handleDeleteDoctor = doctor => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount > 0){
                    refetch();
                    toast.success(`Doctor ${doctor.name} Deleted Successfully`)
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-3xl font-semibold'>Manage Doctors : {doctors?.length} </h2>
            <div className="divider  divider-accent "></div>
            <div className="overflow-x-auto">
                <table className="table flex-wrap">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, i) => <tr key={doctor._id} className="hover">
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-20 rounded-full">
                                            <img src={doctor.image} alt='' />
                                        </div>
                                    </div>
                                </td>
                                <td className='font-semibold text-md'>{doctor.name}</td>
                                <td className='text-md'>{doctor.email}</td>
                                <td className='font-semibold text-md'>{doctor.speciality}</td>
                                <td><label htmlFor='confirmation-modal' className="btn btn-sm btn-error text-white rounded-none" onClick={() => setDeletingDoctor(doctor)}>Delete</label></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are you sure, you want to Delete`}
                    message={`If you delete ${deletingDoctor.name}. It can not be undone.`}
                    successAction={handleDeleteDoctor}
                    modalData={deletingDoctor}
                    closeModal={closeModal}
                    successButtonName="Delete"
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;