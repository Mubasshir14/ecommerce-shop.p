import React from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import useNotifications from '../hooks/useNotification';
import { FaDeleteLeft } from 'react-icons/fa6';

const Notification = () => {
    const { user } = useAuth();
    const [userNotifications, refetch] = useNotifications();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://ecommerce-shop-p-server.onrender.com/notification/${id}`);
            refetch(); 
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    return (
        <div className="flex items-center justify-center max-w-screen-xl mx-auto ">
            <div className='flex flex-col gap-2'>
                {
                    userNotifications.length > 0 ? (
                        userNotifications.map((notification, index) => (
                            <div key={index} className="text-black font-bold p-3 rounded mb-2 shadow-xl border-b-4 border-2 border-black">
                                <div className='flex'>
                                    <div className='flex-1'>
                                        <p>{notification.message}</p>
                                        <p className="text-gray-500 text-sm">
                                            {new Date(notification.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                    {/* Delete button */}
                                    <button
                                        className='text-xl ml-4 text-red-500 hover:text-red-700'
                                        onClick={() => handleDelete(notification._id)} 
                                    >
                                        <FaDeleteLeft />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center font-semibold">No notifications to show.</p>
                    )
                }
            </div>
        </div>
    );
};

export default Notification;
