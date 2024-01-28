import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users')
            const data = await res.json();
            return data;
        }
    });

    const handleMakeAdmin = (id) => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.acknowledged === true){
                    toast.success('Make Admin Successfull');
                    refetch();
                }
            })
    }

    return (
        <div>
            <h2 className="text-3xl mb-5 font-semibold">All Users</h2>
            <table className="table">
                <thead>
                    <tr className='bg-base-300'>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, i) => <tr className='hover' key={user._id}>
                            <th>{i + 1}</th>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.role !== 'admin' && <button className='btn btn-neutral btn-sm' onClick={() => handleMakeAdmin(user._id)}>Make Admin</button> }</td>
                            <td><button className="btn btn-neutral btn-sm">Delete User</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;