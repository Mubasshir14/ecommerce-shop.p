import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Dashboard from './Dashboard';
const ManageUsers = () => {

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('https://ecommerce-shop-p-server.onrender.com/users');
            console.log('Response:', res); return res.data;
        }
    });

    const handleDelete = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) { 
                axios.delete(`https://ecommerce-shop-p-server.onrender.com/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The user has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: "An error occurred while deleting the user.",
                            icon: "error"
                        });
                    });
            }
        });
    };


    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to make ${user.name} an admin?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`https://ecommerce-shop-p-server.onrender.com/users/${user._id}`, { role: "admin" })
                    .then(res => {
                        if (res.data.modifiedCount > 0) { 
                            refetch(); 
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.name} is now an Admin`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: "An error occurred while updating the user.",
                            icon: "error"
                        });
                    });
            }
        });
    };
    


    return (
        <div>
            <Dashboard/>
            <div className="md:-mt-28 -mt-20 mb-20 max-w-4xl mx-auto shadow-md bg-white border border-gray-200">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-6 items-center">
                        <div className="md:text-3xl text-xl font-semibold font-cinzel mb-4 md:mb-0">
                            {/* All Users: {users.length} */}
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr className="bg-gray-600 text-white">
                                    <td className="py-2 px-4 uppercase font-bold"></td>
                                    <td className="py-2 px-4 uppercase font-bold">Name</td>
                                    <td className="py-2 px-4 uppercase font-bold">Email</td>
                                    <td className="py-2 px-4 uppercase font-bold">Role</td>
                                    <td className="py-2 px-4 uppercase font-bold">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => (
                                        <tr key={user._id} className="border-t">
                                            <td className="py-2 px-4 text-[#151515] fonr-bold">{index + 1}</td>
                                            <td className="py-2 px-4  text-[#737373]">
                                                {user.name}
                                            </td>
                                            <td className="py-2 px-4 text-[#737373] ">
                                                {user.email}
                                            </td>
                                            <td className="py-2 px-4 ">
                                            {
                                                user.role === 'admin' ? 
                                                <button
                                                        
                                                        className="  mx-auto text-[#737373]">
                                                        Admin
                                                    </button>
                                                :
                                                    <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                        className="bg-gray-600 text-white px-2 py-2 rounded mx-auto">
                                                        <FaUsers />
                                                    </button>
                                            }

                                            </td>
                                            <td className="py-2 px-4 ">
                                                <button
                                                    onClick={() => handleDelete(user)}
                                                    className="bg-[#B91C1C] text-white px-2 py-2 rounded mx-auto">
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;